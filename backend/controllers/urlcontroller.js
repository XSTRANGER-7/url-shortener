

const mongoose = require('mongoose');
const Url = require('../models/urlModel');
const shortid = require('shortid');

const BASE_URL = 'http://short.work.gd';  // Your custom domain

exports.redirectUrl = async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const url = await Url.findOne({ shortUrl });
    if (url) {
      res.redirect(url.originalUrl);
    } else {
      res.status(404).send('URL not found');
    }
  } catch (err) {
    console.error('Error redirecting:', err);
    res.status(500).send('Server error');
  }
};

exports.shortenUrl = async (req, res) => {
  const { originalUrl, customUrl } = req.body;
  const shortUrl = customUrl || shortid.generate();

  try {
    const existingUrl = await Url.findOne({ shortUrl });
    if (existingUrl) {
      return res.status(400).json({ error: 'Custom URL already taken' });
    }

    const newUrl = new Url({ shortUrl, originalUrl });
    await newUrl.save();

    // Return the shortened URL with the custom domain
    res.json({ shortenedUrl: `${BASE_URL}/${shortUrl}` });
  } catch (err) {
    console.error('Error creating shortened URL:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
