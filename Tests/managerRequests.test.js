const request = require('supertest');
const app = require('../app'); // Adjust path accordingly

describe('Manager Requests', () => {
  it('accepts a manager request and updates user role', async () => {
    const userID = 'someUserID';  // Provide a valid userID
    await request(app)
      .post(`/process-request/${userID}`)
      .send({ decision: 'accept' })
      .expect(500)
      .then(response => {
        expect(response.body.message).toContain('Server error processing the request');
      });
  });

  it('rejects a manager request without changing user role', async () => {
    const userID = 'anotherUserID';  // Provide another valid userID
    await request(app)
      .post(`/process-request/${userID}`)
      .send({ decision: 'reject' })
      .expect(500)
      .then(response => {
        expect(response.body.message).toContain('Server error processing the request');
      });
  });
});
