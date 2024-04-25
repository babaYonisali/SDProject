const request = require('supertest');
const app = require('../app'); // Ensure your Express app is exported properly for import

// Extend the mock for the userModel to include the insertMany method
jest.mock('../models/userModel', () => ({
  findOne: jest.fn(),
  insertMany: jest.fn()
}));

// Get a reference to the mocked module
const User = require('../models/userModel');

describe('/signUp endpoint', () => {
  beforeEach(() => {
    // Reset the mocks before each test
    User.findOne.mockReset();
    User.insertMany.mockReset();
  });

  it('should successfully register a new user', async () => {
    // Simulate that the user does not already exist
    User.findOne.mockResolvedValue(null);
    // Simulate successful insertion of the user
    User.insertMany.mockResolvedValue([{ userID: 'newUser', role: 'applicant', contact: '1234567890' }]);

    const newUser = { userID: 'newUser', role: 'applicant', contact: '1234567890' };
    const response = await request(app)
      .post('/signUp')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User added successfully');
  });

  it('should return 409 if the user already exists', async () => {
    // Simulate finding an existing user
    User.findOne.mockResolvedValue({ userID: 'existingUser', role: 'applicant' });

    const existingUser = { userID: 'existingUser', role: 'applicant', contact: '1234567890' };
    const response = await request(app)
      .post('/signUp')
      .send(existingUser);

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('User already exists');
  });

  it('should return 500 if there is a database error', async () => {
    // Simulate database error during user creation
    User.findOne.mockResolvedValue(null);
    User.insertMany.mockRejectedValue(new Error('Database error'));

    const newUser = { userID: 'newUser', role: 'applicant', contact: '1234567890' };
    const response = await request(app)
      .post('/signUp')
      .send(newUser);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Error adding user');
  });
});
