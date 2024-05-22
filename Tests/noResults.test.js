// const request = require('supertest');
// const app = require('../app');  // Ensure your Express app is exported properly for import

// describe('No Results Handling', () => {
//     it('should return an empty array if no funds are found', async () => {
//       // Assuming the database is clean and has no funds for this test
//       await request(app)
//         .get('/viewFundOpps')
//         .expect(500)
//         .then(response => {
//           expect(response.body).toContain([]);
//         });
//     });
  
//     it('should return an empty array if no users are found', async () => {
//       // Assuming the database is clean and has no users for this test
//       await request(app)
//         .get('/viewUsers')
//         .expect(500)
//         .then(response => {
//           expect(response.body).toContain([]);
//         });
//     });
//   });


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

  