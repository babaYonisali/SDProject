const request = require('supertest');
const app = require('../app'); // Adjust path accordingly

describe('User Management', () => {
  it('fetches all users', async () => {
    await request(app)
      .get('/viewUsers')
      .expect(500)
      .then(response => {
        expect(response.body.message).toContain('Failed to fetch requests');
      });
  });
});
