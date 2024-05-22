const request = require('supertest');
const app = require('../app');  // Ensure your Express app is exported properly for import

describe('Invalid Routes', () => {
    it('should return 404 for an invalid route', async () => {
      await request(app)
        .get('/invalidRoute')
        .expect(404)
        .then(response => {
          expect(response.text).toContain('Cannot GET /invalidRoute');
        });
    });
  });
  