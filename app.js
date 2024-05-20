const connectDB= require("./config/db")
const express =require('express')
const app= express()
const PORT =process.env.PORT||3000
const User=require("./models/userModel")
const funds=require("./models/funds")
const fundApplications=require("./models/fundApplications")
const managerRequest=require("./models/managerRequestModel")
const PDF=require("./models/pdfModel")
const multer=require('multer')
const nodemailer = require('nodemailer');
connectDB();
const path = require('path');
const {expressjwt:jwt}=require('express-jwt')
const jwksRsa=require('jwks-rsa')
const cors= require('cors')
app.use(express.json());

const corsOptions = {
    origin: 'https://brave-mushroom-0e83c5603.5.azurestaticapps.net/', // Replace with your Azure Static Web Apps URL
    optionsSuccessStatus: 200
};
  
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 
const jwtCheck = jwt({
      secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://dev-32ptb8idfvaxx33n.eu.auth0.com/.well-known/jwks.json`
    }),
    audience: 'http://fundit.azurewebsites.net/',
    issuer: `https://dev-32ptb8idfvaxx33n.eu.auth0.com/`,
    algorithms: ['RS256']
  });
  
 app.use(jwtCheck);

app.post('/login',async (req, res) => {
    const { userID } = req.body;
    const user = await User.findOne({ userID });
    if (!user) {
        return res.status(404).send("User not found");
    }
    res.json({role: user.role });
});

app.post('/signUp', async (req, res) => {
    const { userID, role, contact } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ userID });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Insert the new user if they don't exist
        await User.insertMany([req.body]); // Using an array as insertMany expects an array
        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding user', error: error.message });
    }
});
app.post('/managerRequest', async (req, res) => {
    const { userID,motivation} = req.body;
    try {
        const existingmanagerRequest = await managerRequest.findOne({ userID });
        if (existingmanagerRequest) {
            return res.status(409).json({ message: 'Request already exists' });
        }
        await managerRequest.insertMany([req.body]);
      res.status(201).send({ message: 'Request created successfully'});
    } catch (error) {
      res.status(500).send({ message: 'Failed to create request', error: error.message });
    }
  });
  app.post('/AddFund', async (req, res) => {
    const { userID,fundName,companyName,funtType,description} = req.body;
    try {
        const existingfund = await funds.findOne({fundName});
        if (existingfund) {
            return res.status(409).json({ message: 'Fund with this name already exists' });
        }
        await funds.insertMany([req.body]);
      res.status(201).send({ message: 'Request created successfully'});
    } catch (error) {
      res.status(500).send({ message: 'Failed to create request', error: error.message });
    }
  });
  app.post('/AddFundApplication', async (req, res) => {
    const { userID,managerUserID,fundName,motivation,applicationStatus} = req.body;
    try {
        const existingfundApplication = await fundApplications.findOne({fundName,userID});
        if (existingfundApplication) {
            return res.status(409).json({ message: 'Fund Applications already exists' });
        }
        await fundApplications.insertMany([req.body]);
      res.status(201).send({ message: 'Request created successfully'});
    } catch (error) {
      res.status(500).send({ message: 'Failed to create request', error: error.message });
    }
  });
  app.post('/process-request/:userID', async (req, res) => {
    const { decision } = req.body;
    const { userID } = req.params;  
    try {
      // Find and delete the manager request for this user
      const request = await managerRequest.findOneAndDelete({ userID});
  
      if (!request) {
        return res.status(404).send({ message: 'No request found for this user.' });
      }
  
      if (decision === 'accept') {
        // Update user role to 'manager'
        const updatedUser = await User.findOneAndUpdate({ userID}, { role: 'manager' }, { new: true });
  
        if (!updatedUser) {
          return res.status(404).send({ message: 'User not found.' });
        }
        res.send({ message: 'Request accepted and user role updated to manager.', user: updatedUser });
      } else if (decision === 'reject') {
        // Simply return a response; no change to user role
        res.send({ message: 'Request rejected. No changes made to user role.' });
      } else {
        res.status(400).send({ message: 'Invalid decision. Must be "accept" or "reject".' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Server error processing the request', error: error.message });
    }
  });
  app.get('/viewManagerRequests', async (req, res) => {
    try {
      const requests = await managerRequest.find({});
      res.status(200).send(requests);
    } catch (error) {
      res.status(500).send({ message: "Failed to fetch requests", error: error.message });
    }
  });
  app.get('/viewFundOpps', async (req, res) => {
    try {
      const requests = await funds.find({});
      res.status(200).send(requests);
    } catch (error) {
      res.status(500).send({ message: "Failed to fetch funds", error: error.message });
    }
  });
  app.get('/viewFundApplications/:managerUserID', async (req, res) => {
    const {managerUserID}=req.params;
    try {
      const requests = await PDF.find({managerUserID});
      res.status(200).send(requests);
    } catch (error) {
      res.status(500).send({ message: "Failed to fetch funds", error: error.message });
    }
  });
  app.get('/viewFundStatus/:userID', async (req, res) => {
    const {userID}=req.params;
    try {
      const requests = await PDF.find({userID});
      res.status(200).send(requests);
    } catch (error) {
      res.status(500).send({ message: "Failed to fetch funds", error: error.message });
    }
  });
  app.get('/viewUsers', async (req, res) => {
    try {
      const requests = await User.find({});
      res.status(200).send(requests);
    } catch (error) {
      res.status(500).send({ message: "Failed to fetch requests", error: error.message });
    }
  });
  app.get('/viewMyFunds/:userID', async (req, res) => {
    const { userID } = req.params;
    try {
      const userFunds = await funds.find({ userID });
      res.status(200).send(userFunds);
    } catch (error) {
      console.error('Error fetching user funds:', error);
      res.status(500).send({ message: "Failed to fetch funds", error: error.message });
    }
  });
  app.get('/process-blockedUser/:userID', async (req, res) => {
    const { userID } = req.params;  
    try {
        const updatedUser = await User.findOneAndUpdate({ userID}, { role: 'blocked' }, { new: true });
        if (!updatedUser) {
          return res.status(404).send({ message: 'User not found.' });
        }
        res.send({ message: 'User Blocked.', user: updatedUser });
    } catch (error) {
      res.status(500).send({ message: 'Server error processing the request', error: error.message });
    }
  });
  app.post('/process-fundApplication/:userID', async (req, res) => {
    const { fundName, decision } = req.body;
    const { userID } = req.params;
    
    try {
      // Find the user to get their email
      const user = await User.findOne({ userID });
      
      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }
  
      // Update the application status in the PDF collection
      const updatedApplication = await PDF.findOneAndUpdate(
        { userID, fundName },
        { $set: { applicationStatus: decision } },
        { new: true }
      );
  
      if (!updatedApplication) {
        return res.status(404).send({ message: 'Fund application not found.' });
      }
      const mailConfig ={
        service: 'gmail', // e.g., 'gmail'
        auth: {
          user: 'compsciwarriors@gmail.com',
          pass: 'wdbs fewt gvhl qpne'
        }
      };
      const transporter=nodemailer.createTransport(mailConfig)
  
      // Prepare email content
      const message = {
        from: 'compsciwarriors@gmail.com',
        to: user.contact,
        subject: 'Fund Application Status',
        html:`<b>Your application for the fund "${fundName}" has been ${decision}.</b>`
      };
  
      // Send email
      transporter.sendMail(message, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).send({ message: 'Failed to send email', error: error.message });
        }
        console.log('Email sent:', info.response);
      });
  
      res.send({ message: `Application ${decision}.`, user: updatedApplication });
    } catch (error) {
      console.error('Server error processing the request:', error);
      res.status(500).send({ message: 'Server error processing the request', error: error.message });
    }
  });


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define the POST route for uploading a PDF
app.post('/uploadPDF', upload.single('pdf'), async (req, res) => {
    try {
        const { userID, fundName,managerUserID,motivation,applicationStatus } = req.body;
        const existingPDF = await PDF.findOne({fundName,userID});
        if (existingPDF) {
            return res.status(409).json({ message: 'PDF already exists' });
        }
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Create a new PDF document
        const newPDF = new PDF({
            userID: userID,
            fundName: fundName,
            managerUserID:managerUserID,
            applicationStatus:applicationStatus,
            motivation:motivation,
            pdf: {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            },
        });

        // Save the PDF to the database
        await newPDF.save();

        res.status(201).json({ message: 'PDF uploaded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to upload PDF', error: error.message });
    }
});
app.post('/updateFundAmount', async (req, res) => {
  const { fundName } = req.body;

  try {
    if (!fundName) {
      return res.status(400).send({ message: 'Fund name is required.' });
    }

    // Find the fund to get the amountPerApplicant
    const fund = await funds.findOne({ fundName });

    if (!fund) {
      return res.status(404).send({ message: 'Fund not found.' });
    }

    // Calculate the new currentAmount
    const newCurrentAmount = fund.currentAmount - fund.amountPerApplicant;

    // Update the fund's currentAmount
    const updatedFund = await funds.findOneAndUpdate(
      { fundName },
      { currentAmount: newCurrentAmount },
      { new: true }
    );

    res.send({ message: 'Fund amount updated successfully.', fund: updatedFund });
  } catch (error) {
    console.error('Error updating fund amount:', error);
    res.status(500).send({ message: 'Failed to update fund amount', error: error.message });
  }
});

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})
