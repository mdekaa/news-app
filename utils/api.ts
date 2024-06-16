import axios from 'axios';

const gnewsApiKey = process.env.GNEWS_API_KEY; // Replace with your GNews API key

export const fetchNews = async (page: number = 1, pageSize = 20, keyword?: string) => {
  const url = 'https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=12d61703580aac1cf88d82295fa3072f';
  const params = {
    q: keyword || 'top news',
    sortBy: 'date',
    pageSize,
    page,
    apiKey: gnewsApiKey,
  };

  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error; // Re-throw for handling in components
  }
};
