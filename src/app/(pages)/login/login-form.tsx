"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance, setAuthToken } from "../../../../axiosConfig";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post("/login", { username, otp });
      const token = response.data.token;
      setAuthToken(token);
      localStorage.setItem("token", token);
      router.push("/quote-list");
    } catch (error) {
      alert("Login failed");
      throw error;
    }
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='text'
        placeholder='OTP'
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default LoginForm;
