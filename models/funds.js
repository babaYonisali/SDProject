const mongoose = require('mongoose');

// Define the schema for the user request
const fundsSchema = new mongoose.Schema({
  userID: {
    type: String, 
    required: true,
  },
  fundName: {
    type: String,
    required: true,
    trim: true // Trims whitespace from the ends
  },
  CompanyName: {
    type: String,
    required: true,
    trim: true // Trims whitespace from the ends
  },
  fundType: {
    type: String,
    required: true,
    trim: true // Trims whitespace from the ends
  },
  description: {
    type: String,
    required: true,
    trim: true // Trims whitespace from the ends
  }
});

// Create the model from the schema
const funds = mongoose.model('funds', fundsSchema);

module.exports = funds;