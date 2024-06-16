"use client" // Likely related to server-side rendering (SSR), can disregard for now

import React, { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import { fetchNews } from '../utils/api'; // Assuming this fetches news data

// Define the NewsArticle interface
interface News {
  articles: NewsArticle[];
  totalResults: number;
}

interface NewsArticle {
  title: string;
  url: string;
  urlToImage?: string; // Optional image URL
  description?: string;
}

const HomePage: React.FC = () => {
  const [news, setNews] = useState<News>({ articles: [], totalResults: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Added for error messages

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const newNews = await fetchNews(currentPage);
        setNews((prevNews) => ({
          articles: [...prevNews.articles, ...newNews.articles],
          totalResults: newNews.totalResults,
        }));
      } catch (error) {
        // Handle error here based on your specific needs
        setHasError(true);

        // Provide a more informative error message
        if (error instanceof Error) { // Check if it's an Error object
          setErrorMessage(error.message || 'Error fetching news');
        } else {
          setErrorMessage('An unexpected error occurred');
          console.error('Error fetching news:', error); // Log the unexpected error
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleLoadMore = async () => {
    if (!isLoading && news.articles.length < news.totalResults) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {hasError && (
        <div className="text-center text-red-500">{errorMessage}</div>
      )}
      {isLoading ? (
        <div className="text-center">Loading news...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {news.articles.map((article) => (
              <NewsCard key={article.url} {...article} />
            ))}
          </div>
          {news.articles.length < news.totalResults && (
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
