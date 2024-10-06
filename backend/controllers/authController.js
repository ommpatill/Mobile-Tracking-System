const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
  console.log("signup authcontroller ", req)
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  console.log("hello....")
  const { username, password } = req.body;

  try {
    // Check if the username exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials: User does not exist' });
    }

    // Verify if the password matches the one stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials: Incorrect password' });
    }

    // Generate JWT token on successful login
    const token = jwt.sign({ id: user._id }, 'my-super-secret-key', { expiresIn: '1h' });
    
    // Send the token and username as response
    res.json({ token, username: user.username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
