const request = require('supertest');
const app = require('../app'); // Adjust path accordingly

describe('Fund Application Processing', () => {
  it('processes fund application for a specific user', async () => {
    await request(app)
      .post('/process-fundApplication/testUserID')
      .send({ fundName: 'testFund', decision: 'approve' })
      .expect(500)
      .then(response => {
        expect(response.body.message).toContain('Server error processing the request');
      });
  });
});
