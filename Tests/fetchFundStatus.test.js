const request = require('supertest');
const app = require('../app'); // Adjust path accordingly

describe('Fund Status by UserID', () => {
  it('fetches fund status by userID', async () => {
    await request(app)
      .get('/viewFundStatus/testUserID')
      .expect(500)
      .then(response => {
        expect(response.body.message).toContain('Failed to fetch funds');
      });
  });
});
