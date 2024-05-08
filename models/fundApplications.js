const mongoose = require('mongoose');

// Define the schema for the user request
const fundApplicationSchema = new mongoose.Schema({
  userID: {
    type: String, 
    required: true,
    unique:true
  },
  managerUserID:{
  type: String,
  required: true,
  trim: true // Trims whitespace from the ends
},
  fundName: {
    type: String,
    required: true,
    trim: true // Trims whitespace from the ends
  },
  motivation:{
    type: String,
    required: true,
    trim: true // Trims whitespace from the ends
  },
  applicationStatus:{
    type: String,
    required: true,
    trim: true // Trims whitespace from the ends
  }


});

// Create the model from the schema
const fundApplication = mongoose.model('fundApplications', fundApplicationSchema);

module.exports = fundApplication;