const express = require('express');
const Activity = require('../models/Activity');
const { verifyToken } = require('../middleware/auth'); // Middleware to verify JWT token
const ContactMessage = require('../models/ContactMessage');

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


router.post('/contactUs', verifyToken, async (req, res) => {
  try {
    console.log("-api hit.... ", req.body)
    const { name, email, message } = req.body;
    const newActivity = new ContactMessage({
      name,
      email,
      message
    });

    await newActivity.save();
    res.status(201).json({ message: 'request recorded successfully', newActivity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
