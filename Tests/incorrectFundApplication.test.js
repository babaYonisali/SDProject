const request = require('supertest');
const app = require('../app'); // Adjust path accordingly

describe('Fund Application Creation', () => {
    it('should fail to create a fund application with missing fields', async () => {
      await request(app)
        .post('/AddFundApplication')
        .send({ userID: 'testUserID' }) // Missing other required fields
        .expect(400)
        .then(response => {
          expect(response.body.message).toContain('Missing required fields');
        });
    });
  });
  