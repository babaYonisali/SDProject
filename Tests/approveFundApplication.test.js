const request = require('supertest');
const app = require('../app'); // Adjust path accordingly

describe('Fund Application Processing with Decision Approve', () => {
  it('processes fund application with decision approve', async () => {
    await request(app)
      .post('/process-fundApplication/testUserID')
      .send({ fundName: 'testFund', decision: 'approve' })
      .expect(500)
      .then(response => {
        expect(response.body.message).toContain('Server error processing the request');
      });
  });
});
