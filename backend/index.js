// Load environment variables from .env
require('dotenv').config();

// Core dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');

// MongoDB connection
const connectDB = require('./config/db');

// Create express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Vendor Supply Platform Backend Running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
