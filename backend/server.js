const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Ensure this path is correct based on your project structure
const userRoutes = require('./routes/user'); // Import user routes
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors()); // To allow cross-origin requests

// Routes
// app.use('/api/auth', authRoutes); // Mount the auth routes
app.use('/api/auth', authRoutes); // Mounts auth routes

app.use('/api/users', userRoutes); // Mount the user routes (assuming you'll implement this)

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected....!'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
