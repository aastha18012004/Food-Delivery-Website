const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const foodItemRoutes = require('./routes/foodItemRoutes');

// Initialize express app
const app = express();
const path = require('path');

// Middleware
app.use(express.json());
app.use(cors());

// Serve static image files
app.use('/images', express.static(path.join(__dirname, '../frontend/src/assets')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/food-items', foodItemRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});