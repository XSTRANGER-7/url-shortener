



import React, { useState } from 'react';
import { shortenUrl } from '../services/api';

function URLShortener() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const response = await shortenUrl(originalUrl, customUrl);
      setShortenedUrl(response.shortenedUrl);
    } catch (error) {
      console.error('Error shortening URL:', error);
      setError('Failed to shorten URL. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full border border-gray-300">
        <h2 className="text-3xl font-semibold mb-4 text-center">URL Shortener</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            placeholder="Original URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            className="p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Custom URL (optional)"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            className="p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="py-3 px-6 bg-green-500 text-white border border-green-600 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Shorten URL
          </button>
        </form>
        {shortenedUrl && (
          <p className="mt-4 text-center">
            Your Shortened URL:{" "}
            <a
              href={shortenedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:underline"
            >
              {shortenedUrl}
            </a>
          </p>
        )}
        {error && (
          <p className="mt-4 text-red-500 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}

export default URLShortener;
