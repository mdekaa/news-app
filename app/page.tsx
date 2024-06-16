"use client"
import React, { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import { fetchNews } from '../utils/api';

interface News {
  articles: NewsArticle[];
  totalResults: number;
}

const HomePage: React.FC = () => {
  const [news, setNews] = useState<News>({ articles: [], totalResults: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Added for error message

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
        setHasError(true);
        setErrorMessage(error.message || 'Error fetching news'); // Set generic error if no message
        console.error('Error fetching news:', error);
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
