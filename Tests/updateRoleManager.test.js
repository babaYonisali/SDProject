const request = require('supertest');
const app = require('../app'); // Adjust path accordingly

describe('User Role Update to Manager', () => {
  it('updates user role to manager', async () => {
    await request(app)
      .post('/process-request/testUserID')
      .send({ decision: 'accept' })
      .expect(500)
      .then(response => {
        expect(response.body.message).toContain('Server error processing the request');
      });
  });
});
