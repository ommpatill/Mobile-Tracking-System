const mongoose = require('mongoose');

// Define schema for ContactMessages
const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },        // User's name
  email: { type: String, required: true },       // User's email address
  message: { type: String, required: true },     // The user's query or message
  createdAt: { type: Date, default: Date.now },  // Timestamp of when the message was received
});

// Create the model from the schema
const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

module.exports = ContactMessage;
