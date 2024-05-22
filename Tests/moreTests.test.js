const request = require('supertest');
const app = require('../app'); // Adjust path accordingly
const PDF = require('../models/pdfModel'); // Import the PDF model
const funds = require('../models/funds'); // Import the funds model
const User = require('../models/userModel'); // Import the User model
const managerRequest = require('../models/managerRequestModel'); // Import the managerRequest model

jest.mock('../models/pdfModel');

describe('Fund Status by UserID No Results Handling', () => {
  beforeAll(() => {
    PDF.find.mockResolvedValue([]);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return 200 and an empty array if no fund status is found for userID', async () => {
    await request(app)
      .get('/viewFundStatus/testUserID')
      .expect(200)
      .then(response => {
        expect(response.body).toEqual([]);
      });
  });
});


jest.mock('../models/funds');

describe('Fund Applications by Manager UserID No Results Handling', () => {
  beforeAll(() => {
    funds.find.mockResolvedValue([]);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return 200 and an empty array if no fund applications are found for managerUserID', async () => {
    await request(app)
      .get('/viewFundApplications/testManagerID')
      .expect(200)
      .then(response => {
        expect(response.body).toEqual({});
      });
  });
});

jest.mock('../models/userModel');

describe('User Blocking', () => {
  beforeAll(() => {
    User.findOneAndUpdate.mockResolvedValue({ userID: 'testUserID', role: 'blocked' });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should block a user and return the updated user object', async () => {
    await request(app)
      .get('/process-blockedUser/testUserID')
      .expect(200)
      .then(response => {
        expect(response.body.message).toContain('User Blocked');
        expect(response.body.user.role).toBe('blocked');
      });
  });

  it('should return 404 if user to block is not found', async () => {
    User.findOneAndUpdate.mockResolvedValueOnce(null);

    await request(app)
      .get('/process-blockedUser/nonExistentUserID')
      .expect(404)
      .then(response => {
        expect(response.body.message).toContain('User not found');
      });
  });
});

describe('Error Handling for Add Fund', () => {
    it('should return 500 if there is a database error in adding a fund', async () => {
      jest.spyOn(funds, 'insertMany').mockImplementationOnce(() => {
        throw new Error('Database error');
      });
  
      await request(app)
        .post('/AddFund')
        .send({
          userID: 'testUserID',
          fundName: 'testFund',
          companyName: 'Test Company',
          funtType: 'Test Type',
          description: 'Test Description'
        })
        .expect(500)
        .then(response => {
          expect(response.body.message).toContain('Failed to create request');
        });
  
      funds.insertMany.mockRestore();
    });
  });

  describe('Error Handling for Add Fund', () => {
    it('should return 500 if there is a database error in adding a fund', async () => {
      jest.spyOn(funds, 'insertMany').mockImplementationOnce(() => {
        throw new Error('Database error');
      });
  
      await request(app)
        .post('/AddFund')
        .send({
          userID: 'testUserID',
          fundName: 'testFund',
          companyName: 'Test Company',
          funtType: 'Test Type',
          description: 'Test Description'
        })
        .expect(500)
        .then(response => {
          expect(response.body.message).toContain('Failed to create request');
        });
  
      funds.insertMany.mockRestore();
    });
  });

  describe('User Blocking', () => {
    beforeAll(() => {
      User.findOneAndUpdate.mockResolvedValue({ userID: 'testUserID', role: 'blocked' });
    });
  
    afterAll(() => {
      jest.resetAllMocks();
    });
  
    it('should block a user and return the updated user object', async () => {
      await request(app)
        .get('/process-blockedUser/testUserID')
        .expect(200)
        .then(response => {
          expect(response.body.message).toContain('User Blocked');
          expect(response.body.user.role).toBe('blocked');
        });
    });
  
    it('should return 404 if user to block is not found', async () => {
      User.findOneAndUpdate.mockResolvedValueOnce(null);
  
      await request(app)
        .get('/process-blockedUser/nonExistentUserID')
        .expect(404)
        .then(response => {
          expect(response.body.message).toContain('User not found');
        });
    });
  });

  describe('Error Handling for Add Fund', () => {
    it('should return 500 if there is a database error in adding a fund', async () => {
      jest.spyOn(funds, 'insertMany').mockImplementationOnce(() => {
        throw new Error('Database error');
      });
  
      await request(app)
        .post('/AddFund')
        .send({
          userID: 'testUserID',
          fundName: 'testFund',
          companyName: 'Test Company',
          funtType: 'Test Type',
          description: 'Test Description'
        })
        .expect(500)
        .then(response => {
          expect(response.body.message).toContain('Failed to create request');
        });
  
      funds.insertMany.mockRestore();
    });
  });

  describe('Error Handling for Processing Fund Application', () => {
    beforeAll(() => {
      PDF.findOneAndUpdate.mockImplementation(() => {
        throw new Error('Database error');
      });
    });
  
    afterAll(() => {
      jest.resetAllMocks();
    });
  
    it('should return 500 if there is a database error in processing fund application', async () => {
      await request(app)
        .post('/process-fundApplication/testUserID')
        .send({ fundName: 'testFund', decision: 'approve' })
        .expect(404)
        .then(response => {
          expect(response.body.message).toContain('User not found');
        });
    });
  });

  jest.mock('../models/managerRequestModel');

describe('Error Handling for Processing Manager Request', () => {
  beforeAll(() => {
    User.findOneAndUpdate.mockImplementation(() => {
      throw new Error('Database error');
    });
    managerRequest.findOneAndDelete.mockResolvedValue({ userID: 'testUserID', motivation: 'test' });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return 500 if there is a database error when updating user role to manager', async () => {
    await request(app)
      .post('/process-request/testUserID')
      .send({ decision: 'accept' })
      .expect(500)
      .then(response => {
        expect(response.body.message).toContain('Server error processing the request');
      });
  });

  it('should return 400 for invalid decision', async () => {
    await request(app)
      .post('/process-request/testUserID')
      .send({ decision: 'invalid' })
      .expect(400)
      .then(response => {
        expect(response.body.message).toContain('Invalid decision. Must be "accept" or "reject".');
      });
  });
});

describe('PDF Upload with Missing Fields', () => {
  it('should return 400 if required fields are missing in the request body', async () => {
    await request(app)
      .post('/uploadPDF')
      .send({ userID: 'testUserID' }) // Missing required fields: fundName, managerUserID, motivation, applicationStatus, and the file
      .expect(400)
      .then(response => {
        expect(response.body.message).toContain('No file uploaded');
      });
  });

  it('should return 400 if no file is uploaded', async () => {
    await request(app)
      .post('/uploadPDF')
      .field('userID', 'testUserID')
      .field('fundName', 'testFund')
      .field('managerUserID', 'testManagerID')
      .field('motivation', 'Test motivation')
      .field('applicationStatus', 'pending')
      .expect(400)
      .then(response => {
        expect(response.body.message).toContain('No file uploaded');
      });
  });
});

describe('Invalid Data Handling for Add Fund', () => {
  beforeAll(() => {
    funds.insertMany.mockResolvedValue({});
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return 400 if required fields are missing when adding a new fund', async () => {
    await request(app)
      .post('/AddFund')
      .send({
        fundName: 'testFund', // Missing required fields: userID, companyName, funtType, description
      })
      .expect(400)
      .then(response => {
        expect(response.body.message).toContain('Missing required fields');
      });
  });

  it('should return 400 if fundName is missing when adding a new fund', async () => {
    await request(app)
      .post('/AddFund')
      .send({
        userID: 'testUserID',
        companyName: 'Test Company',
        funtType: 'Test Type',
        description: 'Test Description',
      })
      .expect(400)
      .then(response => {
        expect(response.body.message).toContain('Missing required fields');
      });
  });
});