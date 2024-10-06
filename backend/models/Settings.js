const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  notificationsEnabled: {
    type: Boolean,
    default: true,
  },
  theme: {
    type: String,
    default: 'light',
  },
  // Add more settings as needed
});

module.exports = mongoose.model('Settings', SettingsSchema);
