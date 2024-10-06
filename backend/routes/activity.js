const express = require('express');
const Activity = require('../models/Activity');
const { verifyToken } = require('../middleware/auth'); // Middleware to verify JWT token

const router = express.Router();

// Create Activity
router.post('/', verifyToken, async (req, res) => {
  try {
    const { activity } = req.body;
    const newActivity = new Activity({
      userId: req.user.id,
      activity,
    });

    await newActivity.save();
    res.status(201).json({ message: 'Activity recorded successfully', newActivity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Activities for a User
router.get('/', verifyToken, async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.user.id });
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
