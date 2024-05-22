const request = require('supertest');
const app = require('../app'); // Adjust path accordingly

describe('Process Manager Requests', () => {
//   it('should accept manager request', async () => {
//     await request(app)
//       .post('/process-request/testUserID')
//       .send({ decision: 'accept' })
//       .expect(200)
//       .then(response => {
//         expect(response.body.message).toContain('Request accepted and user role updated to manager');
//       });
//   });

//   it('should reject manager request', async () => {
//     await request(app)
//       .post('/process-request/testUserID')
//       .send({ decision: 'reject' })
//       .expect(200)
//       .then(response => {
//         expect(response.body.message).toContain('Request rejected. No changes made to user role');
//       });
//   });

  it('should return 400 for invalid decision', async () => {
    await request(app)
      .post('/process-request/testUserID')
      .send({ decision: 'invalid' })
      .expect(400)
      .then(response => {
        expect(response.body.message).toContain('Invalid decision. Must be "accept" or "reject"');
      });
  });
});
