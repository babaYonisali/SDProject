const request = require('supertest');
const app = require('../app'); // Adjust path accordingly

describe('Manager Request Processing', () => {
  it('processes a manager request', async () => {
    await request(app)
      .post('/process-request/testUserID')
      .send({ decision: 'accept' })
      .expect(500)
      .then(response => {
        expect(response.body.message).toContain('Server error processing the request');
      });
  });
});
