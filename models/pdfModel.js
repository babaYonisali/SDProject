const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    userID: { 
        type: String, 
        required: true 
    },
    fundName: { 
        type: String,
        required: true
     },
    managerUserID:{
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
          },
        pdf: {
        data: { type: Buffer, required: true },
        contentType: { type: String, required: true },
    }
});

const PDF = mongoose.model('PDF', pdfSchema);

module.exports = PDF;
