const request = require('supertest');
const app = require('../app'); // Adjust path accordingly
const funds = require('../models/funds');
const User = require('../models/userModel');

jest.mock('../models/funds');
jest.mock('../models/userModel');

describe('No Results Handling', () => {
  beforeAll(() => {
    funds.find.mockResolvedValue([]);
    User.find.mockResolvedValue([]);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return 200 and an empty array if no funds are found', async () => {
    await request(app)
      .get('/viewFundOpps')
      .expect(200)
      .then(response => {
        expect(response.body).toEqual([]);
      });
  });

  it('should return 200 and an empty array if no users are found', async () => {
    await request(app)
      .get('/viewUsers')
      .expect(200)
      .then(response => {
        expect(response.body).toEqual([]);
      });
  });
});
