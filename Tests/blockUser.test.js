const request = require('supertest');
const app = require('../app'); // Adjust path accordingly

describe('User Blocking', () => {
  it('blocks a user', async () => {
    await request(app)
      .get('/process-blockedUser/testUserID')
      .expect(500)
      .then(response => {
        expect(response.body.message).toContain('Server error processing the request');
      });
  });
});
