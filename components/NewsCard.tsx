import React from 'react';
import  '@/app/styles/newCard.css'

interface NewsArticle {
  title: string;
  url: string;
  urlToImage?: string; // Optional image URL
  description?: string;
}

const NewsCard: React.FC<NewsArticle> = ({ title, urlToImage, description, url }) => {
    return (
      <div className="card">
        {urlToImage && <img src={urlToImage} alt={title} className="card-image" />}
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
          <a href={url} className="card-link">
            Read More
          </a>
        </div>
      </div>
    );
  };

export default NewsCard;
