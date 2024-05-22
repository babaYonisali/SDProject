const request = require('supertest');
const app = require('../app'); // Make sure this path is correct

describe('Fund Opportunities', () => {
    it('should fetch all fund opportunities', async () => {
      await request(app)
        .get('/viewFundOpps')
        .expect(500)
        .then(response => {
            expect(response.body.message).toContain('Failed to fetch funds');
        });
    });
});
  