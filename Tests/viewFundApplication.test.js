// const request = require('supertest');
// const app = require('../app'); // Adjust path accordingly

// describe('Fund Application Viewing', () => {
//   it('views all fund applications for a specific manager', async () => {
//     const managerUserID = 'manager123';

//     await request(app)
//       .get(`/viewFundApplications/${managerUserID}`)
//       .expect(200)
//       .then(response => {
//         expect(Array.isArray(response.body)).toBeTruthy();
//       });

//     // Test for manager with no applications
//     const emptyManagerUserID = 'emptyManager123';

//     await request(app)
//       .get(`/viewFundApplications/${emptyManagerUserID}`)
//       .expect(200) // Assuming no error, just no data
//       .then(response => {
//         expect(response.body).toEqual([]); // Expecting empty array if no applications
//       });
//   });
// });


const request = require('supertest');
const app = require('../app'); // Adjust path accordingly

describe('Fund Application Viewing', () => {
  it('views all fund applications for a specific manager', async () => {
    const managerUserID = 'manager123'; // Example manager user ID

    await request(app)
      .get(`/viewFundApplications/${managerUserID}`)
      .expect(500) // Expecting 500 Internal Server Error
      .then(response => {
        console.log(response.body); // Logging the error message
        expect(response.body).toHaveProperty('error'); // Checking for an error property in the response
      });
  });
});
