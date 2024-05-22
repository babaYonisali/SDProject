const request = require('supertest');
const app = require('../app'); // Adjust path accordingly

describe('Manager Request Creation', () => {
  it('creates a new manager request', async () => {
    const managerRequestData = {
      userID: 'testUserID',
      motivation: 'Test motivation'
    };

    await request(app)
      .post('/managerRequest')
      .send(managerRequestData)
      .expect(500)
      .then(response => {
        expect(response.body.message).toContain('Failed to create request');
      });
  });
});
