const request = require('supertest');
const app = require('../app');  // Ensure your Express app is exported properly for import

// Mock the userModel before requiring it
jest.mock('../models/userModel', () => ({
  findOne: jest.fn()
}));

// Get a reference to the mocked module
const User = require('../models/userModel');

describe('/login endpoint', () => {
  beforeEach(() => {
    // Reset the mock for clean slate in each test
    User.findOne.mockReset();
  });

  it('should return user details if user exists', async () => {
    // Set up the mock to resolve with user details when called with specific userID
    User.findOne.mockResolvedValue({ userID: '123', role: 'applicant' });

    const response = await request(app)
      .post('/login')
      .send({ userID: '123' });

    expect(response.status).toBe(200);  // Assuming the endpoint returns 200 for existing user
    expect(response.body.role).toBe('applicant');
  });

  it('should return 404 if user does not exist', async () => {
    // Set up the mock to resolve with null to simulate "user not found"
    User.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post('/login')
      .send({ userID: 'unknown' });

    expect(response.status).toBe(404);
  });
});
