"use client";

// pages/index.js or any other page
import React, { useEffect, useState } from "react";
import NewsGrid from "./NewsGrid";

const HomePage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch your news articles from your backend or API
    const fetchArticles = async () => {
      const response = await fetch(
        "https://financial-news-api.onrender.com/api/news"
      ); // Adjust to your API endpoint
      const data = await response.json();
      console.log(data.news);
      setArticles(data.news); // Assuming data is an array of news articles
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold p-4 text-center">Latest News</h1>
      <NewsGrid articles={articles} />
    </div>
  );
};

export default HomePage;
