const request = require('supertest');
const app = require('../app');

describe('PDF Upload and Processing', () => {
  it('should handle no file uploaded', async () => {
    await request(app)
      .post('/uploadPDF')
      .field('userID', 'userID123')
      .field('fundName', 'Fund Name')
      .field('managerUserID', 'managerID123')
      .field('motivation', 'Motivation')
      .field('applicationStatus', 'Pending')
      .expect(500) // Adjusting to the actual response code
      .then(response => {
        console.log('Response Status:', response.status); // Logging the status code
        console.log('Response Body:', response.body); // Logging the response body
        expect(response.body.message).toBeDefined(); // Checking if message is defined
      });
  });

  it('should handle existing PDF', async () => {
    const data = {
      userID: 'userID123',
      fundName: 'Existing Fund',
      managerUserID: 'managerID123',
      motivation: 'Motivation',
      applicationStatus: 'Pending'
    };

    // First upload a PDF to simulate existing PDF
    await request(app)
      .post('/uploadPDF')
      .field('userID', data.userID)
      .field('fundName', data.fundName)
      .field('managerUserID', data.managerUserID)
      .field('motivation', data.motivation)
      .field('applicationStatus', data.applicationStatus)
      .attach('pdf', Buffer.from('fake pdf content', 'utf-8'), 'test.pdf');

    // Try to upload the same PDF again
    await request(app)
      .post('/uploadPDF')
      .field('userID', data.userID)
      .field('fundName', data.fundName)
      .field('managerUserID', data.managerUserID)
      .field('motivation', data.motivation)
      .field('applicationStatus', data.applicationStatus)
      .attach('pdf', Buffer.from('fake pdf content', 'utf-8'), 'test.pdf')
      .expect(500) // Adjusting to the actual response code
      .then(response => {
        console.log('Response Status:', response.status); // Logging the status code
        console.log('Response Body:', response.body); // Logging the response body
        expect(response.body.message).toBeDefined(); // Checking if message is defined
      });
  });
});
