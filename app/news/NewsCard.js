// components/NewsCard.js
import React from "react";

const NewsCard = ({ title, description, source, date, link }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          {title}
        </h3>
      </a>
      <p className="text-base text-gray-600 dark:text-gray-400 mt-2">
        {description}
      </p>
      <div className="mt-4 flex justify-between text-sm text-gray-500 dark:text-gray-300">
        <span>{source}</span>
        <span>{date}</span>
      </div>
    </div>
  );
};

export default NewsCard;
