const express = require('express');
const Notification = require('../models/Notification');
const { verifyToken } = require('../middleware/auth'); // Middleware to verify JWT token

const router = express.Router();

// Create Notification
router.post('/', verifyToken, async (req, res) => {
  try {
    const { message } = req.body;
    const newNotification = new Notification({
      userId: req.user.id,
      message,
    });

    await newNotification.save();
    res.status(201).json({ message: 'Notification created successfully', newNotification });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Notifications for a User
router.get('/', verifyToken, async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
