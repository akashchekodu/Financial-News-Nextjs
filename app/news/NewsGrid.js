// components/NewsGrid.js
import React from "react";
import NewsCard from "./NewsCard";

const NewsGrid = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-2xl	 mx-auto p-4">
      {articles.map((article, index) => (
        <NewsCard
          key={index}
          title={article.title}
          description={article.description}
          source={article.source}
          date={article.date}
          link={article.link}
        />
      ))}
    </div>
  );
};

export default NewsGrid;
