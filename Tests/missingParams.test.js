const request = require('supertest');
const app = require('../app'); // Adjust path accordingly

describe('Error Handling for Missing Parameters', () => {
  it('should return 400 for missing parameters in AddFundApplication', async () => {
    await request(app)
      .post('/AddFundApplication')
      .send({ userID: 'testUserID' }) // Missing other required fields
      .expect(400)
      .then(response => {
        expect(response.body.message).toContain('Missing required fields');
      });
  });

  it('should return 400 for missing parameters in AddFund', async () => {
    await request(app)
      .post('/AddFund')
      .send({ fundName: 'testFund' }) // Missing other required fields
      .expect(400)
      .then(response => {
        expect(response.body.message).toContain('Missing required fields');
      });
  });
});
