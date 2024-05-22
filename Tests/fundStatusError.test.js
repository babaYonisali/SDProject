const PDF = require('../models/pdfModel'); // Import the PDF model
const request = require('supertest');
const app = require('../app'); // Adjust path accordingly

jest.mock('../models/pdfModel');

describe('Database Error Handling for Fund Status', () => {
  it('should return 500 if there is a database error in fetching fund status', async () => {
    // Mock the PDF model to throw an error
    jest.spyOn(PDF, 'find').mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    await request(app)
      .get('/viewFundStatus/testUserID')
      .expect(500)
      .then(response => {
        expect(response.body.message).toContain('Failed to fetch funds');
      });

    // Restore the original implementation
    PDF.find.mockRestore();
  });
});
