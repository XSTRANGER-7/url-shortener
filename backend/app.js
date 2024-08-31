// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const urlRoutes = require('./routes/urlroutes');
// const connectDB = require('./config/db');
// require('dotenv').config();

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // API Routes
// app.use('/api', urlRoutes);

// module.exports = app;




const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const urlRoutes = require('./routes/urlroutes');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000' // Replace with your frontend URL if different
  }));
app.use(bodyParser.json());

// API Routes
app.use('/api', urlRoutes);

module.exports = app;
