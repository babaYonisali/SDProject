const mongoose = require('mongoose');
const { Schema } = mongoose;

const pdfSchema = new Schema({
    userID: { type: String, 
              required: true },
    fundName: { type: String,
               required: true },
    pdf: {
        data: Buffer,
        contentType: String,
        required: true,
    }
});

const PDF = mongoose.model('PDF', pdfSchema);

module.exports = PDF;
