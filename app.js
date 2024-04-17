const connectDB= require("./config/db")
const express =require('express')
const app= express()
const PORT =process.env.PORT||3000
const User=require("./models/userModel")
connectDB();
const path = require('path');
const {expressjwt:jwt}=require('express-jwt')
const jwksRsa=require('jwks-rsa')
const cors= require('cors')
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3001',  // Adjust this to match your frontend app's URL
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,  // If your front-end needs to pass credentials
  };
  
  app.use(cors(corsOptions));
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

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})