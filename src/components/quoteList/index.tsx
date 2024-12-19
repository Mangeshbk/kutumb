"use client";
import React, { useEffect, useState } from "react";
import "./index.css";
import { axiosInstance, setAuthToken } from "../../../axiosConfig";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { getLocalStorage } from "@/utils/helper";
// import { notify } from "../notfication";

interface IQuote {
  createdAt: string;
  updatedAt: string;
  id: number;
  text: string;
  username: string;
  mediaUrl: string;
}

const QuoteList = () => {
  const router = useRouter();
  const [quotes, setQuotes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const user = getLocalStorage("username");
  // const user = localStorage.getItem("username");

  const loadToken = () => {
    const token = getLocalStorage("token");
    // const token = localStorage.getItem("token");
    if (!token) {
      // notify("Please log in to create a quote.", "error");
    } else {
      setAuthToken(token);
    }
  };

  const fetchQuotes = async () => {
    loadToken();
    try {
      const response = await axiosInstance.get(
        `/getQuotes?limit=20&offset=${page}`
      );
      const data = response?.data?.data;
      if (data.length === 0 && page > 1) {
        setHasMore(false);
      } else {
        setQuotes(data);
        setHasMore(true);
      }
    } catch (error) {
      // notify("Failed to fetch quotes", "error");
      throw error;
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  if (!user) {
    return <h1 className='not-login'>Please Login to view quotes</h1>;
  }

  return (
    <main className='quote-list-container'>
      <section className='quote-list'>
        {quotes.map((quote: IQuote) => (
          <div className='quote-card' key={quote.id}>
            <div className='image-container'>
              <Image
                src={
                  quote?.mediaUrl ||
                  "https://media.crafto.app/assignment/4480x6720/018a04f0-6340-4825-86f4-f64cb1647ce3?dimension=4480x6720"
                }
                alt='QuoteMedia'
                className='imgbg'
                fill
              />
              <Image
                src={
                  quote?.mediaUrl ||
                  "https://media.crafto.app/assignment/4480x6720/018a04f0-6340-4825-86f4-f64cb1647ce3?dimension=4480x6720"
                }
                alt='QuoteMedia'
                className='media'
                fill
              />
              <div className='overlay-text'>
                {quote?.text || "sample quote"}
              </div>
            </div>
            <div className='quote-info'>
              <span className='username'> User: {quote?.username}</span>
              <span className='created-at'>
                Created_at:
                {new Date(quote.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </section>

      <div className='pagination-buttons'>
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className='prev-button'
        >
          <FaChevronLeft size={16} />
        </button>
        <button
          onClick={handleNextPage}
          disabled={!hasMore}
          className='next-button'
        >
          <FaChevronRight size={16} />
        </button>
      </div>

      <button
        className='floating-action-button'
        onClick={() => router.push("/create-quote")}
      >
        +
      </button>
    </main>
  );
};

export default QuoteList;
