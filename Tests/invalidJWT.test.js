const request = require('supertest');
const app = require('../app');  // Ensure your Express app is exported properly for import
const jwt = require('jsonwebtoken');

describe('JWT Check Middleware', () => {
  it('should return 401 for invalid JWT token', async () => {
    const invalidToken = jwt.sign({ userID: 'testUserID' }, 'wrongSecret', { algorithm: 'HS256' });

    await request(app)
      .get('/viewManagerRequests')
      .set('Authorization', `Bearer ${invalidToken}`)
      .expect(500)
      .then(response => {
        expect(response.body.message).toContain('Failed');
      });
  });
});
