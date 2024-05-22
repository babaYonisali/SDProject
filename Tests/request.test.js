const request = require('supertest');
const app = require('../app');  // Ensure your Express app is exported properly for import

// Mocking necessary models
jest.mock('../models/userModel', () => ({
  findOneAndUpdate: jest.fn()
}));
jest.mock('../models/managerRequestModel', () => ({
  findOneAndDelete: jest.fn()
}));

const managerRequest = require('../models/managerRequestModel');
const User = require('../models/userModel');

describe('/process-request/:userID endpoint', () => {
  beforeEach(() => {
    // Reset mocks before each test
    managerRequest.findOneAndDelete.mockReset();
    User.findOneAndUpdate.mockReset();
  });

  it('should update user role to manager if decision is accept', async () => {
    // Setting up mocks for accepting the request
    managerRequest.findOneAndDelete.mockResolvedValue({ userID: '123', motivation: "Need more access" });
    User.findOneAndUpdate.mockResolvedValue({ userID: '123', role: 'manager' });

    const response = await request(app)
      .post('/process-request/123')
      .send({ decision: 'accept' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Request accepted and user role updated to manager.',
      user: { userID: '123', role: 'manager' }
    });
  });

  it('should return a message of rejection without changing the user role if decision is reject', async () => {
    // Setting up mocks for rejecting the request
    managerRequest.findOneAndDelete.mockResolvedValue({ userID: '123', motivation: "Need more access" });

    const response = await request(app)
      .post('/process-request/123')
      .send({ decision: 'reject' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Request rejected. No changes made to user role.'
    });
  });

  it('should return 404 if no request is found for the user', async () => {
    // Mocking no request found
    managerRequest.findOneAndDelete.mockResolvedValue(null);

    const response = await request(app)
      .post('/process-request/123')
      .send({ decision: 'accept' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('No request found for this user.');
  });

  it('should return 400 for invalid decision value', async () => {
    // Ensure a dummy request is returned even for invalid decisions
    managerRequest.findOneAndDelete.mockResolvedValue({ userID: '123', motivation: "Need more access" });

    const response = await request(app)
      .post('/process-request/123')
      .send({ decision: 'invalid_decision' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid decision. Must be "accept" or "reject".');
  });
});
