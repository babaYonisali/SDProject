const request = require('supertest');
const app = require('../app'); // Adjust path accordingly

describe('Fund Amount Update', () => {
  it('updates the amount of a specific fund', async () => {
    await request(app)
      .post('/updateFundAmount')
      .send({ fundName: 'testFund' })
      .expect(500)
      .then(response => {
        expect(response.body.message).toContain('Failed to update fund amount');
      });
  });
});
