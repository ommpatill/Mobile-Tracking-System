const express = require('express');
const Settings = require('../models/Settings');
const { verifyToken } = require('../middleware/auth'); // Middleware to verify JWT token

const router = express.Router();

// Create or Update Settings
router.post('/', verifyToken, async (req, res) => {
  try {
    const { notificationsEnabled, theme } = req.body;
    const settings = await Settings.findOneAndUpdate(
      { userId: req.user.id },
      { notificationsEnabled, theme },
      { new: true, upsert: true } // Create if not found
    );

    res.status(200).json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Settings for a User
router.get('/', verifyToken, async (req, res) => {
  try {
    const settings = await Settings.findOne({ userId: req.user.id });
    res.status(200).json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
