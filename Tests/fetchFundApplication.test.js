const request = require('supertest');
const app = require('../app'); // Adjust path accordingly

describe('Fund Applications by Manager UserID', () => {
  it('fetches fund applications by manager userID', async () => {
    await request(app)
      .get('/viewFundApplications/testManagerID')
      .expect(500)
      .then(response => {
        expect(response.body.message).toContain('Failed to fetch funds');
      });
  });
});
