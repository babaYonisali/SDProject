const mongoose = require('mongoose');

// Define the schema for the user request
const managerRequestSchema = new mongoose.Schema({
  userID: {
    type: String, 
    required: true,
    unique:true
  },
  motivation: {
    type: String,
    required: true,
    trim: true // Trims whitespace from the ends
  }
});

// Create the model from the schema
const managerRequest = mongoose.model('managerRequest', managerRequestSchema);

module.exports = managerRequest;