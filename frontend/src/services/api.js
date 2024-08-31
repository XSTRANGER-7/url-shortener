
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  // Use your correct backend URL

export const shortenUrl = async (originalUrl, customUrl) => {
  try {
    const response = await axios.post(`${API_URL}/shorten`, { originalUrl, customUrl });
    return response.data;
  } catch (error) {
    console.error('Error shortening URL:', error);
    throw error;
  }
};
//save
