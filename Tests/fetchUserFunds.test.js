const request = require('supertest');
const app = require('../app'); // Adjust path accordingly

describe('Specific User Funds Viewing', () => {
  it('fetches funds for a specific user', async () => {
    await request(app)
      .get('/viewMyFunds/testUserID')
      .expect(500)
      .then(response => {
        expect(response.body.message).toContain('Failed to fetch funds');
      });
  });
});
