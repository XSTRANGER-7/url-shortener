








const express = require('express');
const router = express.Router();
const Url = require('../models/urlModel');

// Function to generate a random string (for fallback if no custom URL is provided)
const generateRandomString = (length = 7) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Route to create a shortened URL
router.post('/shorten', async (req, res) => {
  const { originalUrl, customUrl } = req.body;

  try {
    // Validate the original URL
    const urlPattern = /^https?:\/\/[^\s$.?#].[^\s]*$/;
    if (!urlPattern.test(originalUrl)) {
      return res.status(400).json({ message: 'Invalid original URL' });
    }

    // Check if custom URL is already taken
    if (customUrl) {
      const existingUrl = await Url.findOne({ shortUrl: customUrl });
      if (existingUrl) {
        return res.status(400).json({ message: 'Custom URL already taken' });
      }
    }

    // Create and save the new URL
    const url = new Url({
      originalUrl,
      shortUrl: customUrl || generateRandomString(),
    });
    await url.save();

    // Determine the base URL
    const baseUrl = process.env.NODE_ENV === 'production' ? process.env.CUSTOM_DOMAIN : 'http://localhost:5000';
    return res.status(201).json({ shortenedUrl: `${baseUrl}/${url.shortUrl}` });
  } catch (error) {
    console.error('Error creating shortened URL:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route to handle redirection from shortened URL
router.get('/:shortUrl', async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl });
    if (url) {
      return res.redirect(url.originalUrl); // Redirect to the original URL
    } else {
      return res.status(404).json({ message: 'URL not found' });
    }
  } catch (error) {
    console.error('Error redirecting:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
