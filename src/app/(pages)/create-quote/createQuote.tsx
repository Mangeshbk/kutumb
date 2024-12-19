"use client";
import React, { useState } from "react";
import { axiosInstance, setAuthToken } from "../../../../axiosConfig";
import Image from "next/image";
import { FaTrash } from "react-icons/fa"; // Importing trash icon from react-icons

const QuoteCreationForm: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const loadToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to create a quote.");
    } else {
      setAuthToken(token);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleDelete = () => {
    setFile(null);
    setImagePreview(null); // Clear file and image preview on delete
  };

  const handleSubmit = async () => {
    try {
      loadToken();
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to create a quote.");
        return;
      }

      const formData = new FormData();
      if (file) formData.append("file", file);

      const uploadResponse = await axiosInstance.post(
        "https://crafto.app/crafto/v1.0/media/assignment/upload",
        formData
      );
      const mediaUrl = uploadResponse?.data[0].url || "";

      // Create quote with text and mediaUrl
      await axiosInstance.post("/postQuote", {
        text,
        mediaUrl,
      });

      alert("Quote created successfully!");
      setText("");
      setFile(null);
      setImagePreview(null);
    } catch (error) {
      alert("Failed to create quote.");
      throw error;
    }
  };

  return (
    <div className='quote-form-container'>
      <textarea
        className='quote-input'
        placeholder='Enter your quote'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type='file'
        className='file-input'
        accept='image/png, image/jpeg, image/webp, image/jpg'
        onChange={handleFileChange}
      />

      {imagePreview && (
        <div className='image-preview-container'>
          <Image
            src={imagePreview}
            alt='Preview'
            width={300}
            height={300}
            className='image-preview'
          />
          <FaTrash onClick={handleDelete} className='delete-icon' />
        </div>
      )}

      <button onClick={handleSubmit} className='submit-button'>
        Submit
      </button>
    </div>
  );
};

export default QuoteCreationForm;
