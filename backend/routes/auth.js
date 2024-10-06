// src/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer'); // For email verification
const crypto = require('crypto'); // For generating unique verification tokens
require('dotenv').config(); // Load environment variables
const router = express.Router();

// Nodemailer transporter setup using environment variables
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use appropriate email service
  auth: {
    user: process.env.SMTP_USER, // Your email from .env
    pass: process.env.SMTP_PASS,  // Your password from .env
  },
});

// Username Availability Check Route
router.get('/check-username/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(200).json({ available: false });
    }
    res.status(200).json({ available: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User Signup
router.post('/signup', async (req, res) => {
  console.log("auth.js..... signup! ", req.body)
  const { firstName, lastName, age, email, username, password, confirmPassword } = req.body;

  // Validate if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password
   // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with 'pending' email verification status
    const newUser = new User({
      firstName,
      lastName,
      age,
      email,
      username,
      password: password,
      isVerified: false, // User must verify email
      verificationToken: crypto.randomBytes(32).toString('hex'), // Generate a unique token
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Send verification email
    const verificationUrl = `http://localhost:5000/api/auth/verify-email/${savedUser.verificationToken}`;
    await transporter.sendMail({
      to: email,
      subject: 'Verify your email',
      html: `<p>Hello ${firstName},</p>
             <p>Thank you for registering. Please verify your email by clicking on the link below:</p>
             <a href="${verificationUrl}">Verify Email</a>`,
    });

    res.status(201).json({ message: 'User registered successfully! Please verify your email to activate your account.' });
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Email Verification Route
router.get('/verify-email/:token', async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token.' });
    }

    // Update user's verification status
    user.isVerified = true;
    user.verificationToken = undefined; // Clear the token after verification
    await user.save();

    res.status(200).json({ message: 'Email verified successfully! You can now log in.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// backend/routes/auth.js
router.post('/login', async (req, res) => {
  console.log("api called...!")
  const { username, password } = req.body;

   console.log("cred ", password);
   //const hashedPassword = await bcrypt.hash(password, 10);
   //console.log("hashedPassword>>>>>>>> ",hashedPassword)

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password...' });
    }
    console.log("user fetched from db:  ", user)

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("isMatch>>> ", password, "  ", user.password, "  ", isMatch )
    console.log(password==user.password)
    // if (!isMatch || !password.compare(user.password)) {
    //   return res.status(400).json({ message: 'Invalid username or password' });
    // }
    if (password != user.password) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }


    console.log(".......1..........")
    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send success response with token and username
    console.log(".......2..........")
    res.json({
      message: 'Login successful',
      username: user.username,
      token, // Include token if you want to handle session later
    });
  } catch (error) {
    console.error("error... ", error)
    res.status(500).json({ message: 'Server error' });
  }
});




module.exports = router;
