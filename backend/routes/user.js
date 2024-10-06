const express = require('express');
const User = require('../models/User'); // Import User model
const router = express.Router();
const authenticate = require('../middleware/authenticate'); // Import JWT authentication middleware

// Get User Profile by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    // Ensure the logged-in user can only access their own profile
    if (req.params.id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const user = await User.findById(req.params.id).select('-password'); // Exclude password from response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update User Profile by ID
router.put('/:id', authenticate, async (req, res) => {
  try {
    // Ensure the logged-in user can only update their own profile
    if (req.params.id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { username, email } = req.body; // Add more fields to update as needed
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email },
      { new: true, runValidators: true }
    ).select('-password'); // Exclude password from response

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete User by ID
router.delete('/:id', authenticate, async (req, res) => {
  try {
    // Ensure the logged-in user can only delete their own profile
    if (req.params.id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
