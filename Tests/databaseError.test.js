const request = require('supertest');
const app = require('../app'); // Adjust path accordingly
const User = require('../models/userModel'); // Import the User model
const funds = require('../models/funds'); // Import the funds model
const fundApplications = require('../models/fundApplications'); // Import the fundApplications model

jest.mock('../models/userModel');

describe('Database Error Handling', () => {
  it('should return 500 if there is a database error in fetching users', async () => {
    // Mock the User model to throw an error
    jest.spyOn(User, 'find').mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    await request(app)
      .get('/viewUsers')
      .expect(500)
      .then(response => {
        expect(response.body.message).toContain('Failed to fetch requests');
      });

    // Restore the original implementation
    User.find.mockRestore();
  });
});

jest.mock('../models/funds');

describe('Database Error Handling for Funds', () => {
  it('should return 500 if there is a database error in fetching funds', async () => {
    // Mock the funds model to throw an error
    jest.spyOn(funds, 'find').mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    await request(app)
      .get('/viewFundOpps')
      .expect(500)
      .then(response => {
        expect(response.body.message).toContain('Failed to fetch funds');
      });

    // Restore the original implementation
    funds.find.mockRestore();
  });
});

jest.mock('../models/fundApplications');

describe('Database Error Handling for Adding Fund Application', () => {
  it('should return 500 if there is a database error in adding fund application', async () => {
    // Mock the fundApplications model to throw an error
    jest.spyOn(fundApplications, 'insertMany').mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    await request(app)
      .post('/AddFundApplication')
      .send({
        userID: 'testUserID',
        managerUserID: 'testManagerID',
        fundName: 'testFund',
        motivation: 'Test motivation',
        applicationStatus: 'pending'
      })
      .expect(500)
      .then(response => {
        expect(response.body.message).toContain('Failed to create request');
      });

    // Restore the original implementation
    fundApplications.insertMany.mockRestore();
  });
});

// describe('User Registration', () => {
//     it('should fail without required fields', async () => {
//       await request(app)
//         .post('/signUp')
//         .send({
//           userID: 'testUserID' // Missing role and contact
//         })
//         .expect(201)
//         .then(response => {
//           expect(response.body.message).toContain('User added successfully');
//         });
//     });
//   });


//   describe('User Registration', () => {
//     it('should fail without required fields', async () => {
//       await request(app)
//         .post('/signUp')
//         .send({
//           userID: 'testUserID' // Missing role and contact
//         })
//         .expect(201)
//         .then(response => {
//           expect(response.body.message).toContain('User added successfully');
//         });
//     });
//   });
  