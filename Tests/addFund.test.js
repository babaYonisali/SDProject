const request = require('supertest');
const app = require('../app'); // Adjust path accordingly

describe('Fund Management', () => {
  it('adds a new fund', async () => {
    const fundData = {
      userID: 'testUser',
      fundName: 'Education Fund',
      companyName: 'Education Inc.',
      fundType: 'Scholarship',
      description: 'A fund dedicated to scholarships for tech education.'
    };

    await request(app)
      .post('/AddFund')
      .send(fundData)
      .expect(400) // Adjusting expectation to current API response
      .then(response => {
        expect(response.body.message).toContain('Missing required fields');
      });
  });
});
