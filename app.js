const users = [
    {
        username: 'admin',
        password: 'admin123',
        role: 'admin'
    },
    {
        username: 'manager',
        password: 'manager123',
        role: 'manager'
    },
    {
        username: 'applicant',
        password: 'applicant123',
        role: 'applicant'
    }
];


const express =require('express')
const app= express()
const PORT =process.env.PORT||3000
const path = require('path');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get("/users",(req,res)=>{
   res.send(users)
})
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(404).send("User not found");
    }
    res.json({ username: user.username, role: user.role });
});
app.post('/signUp', (req, res) => {
    const { username, password, role } = req.body;
    users.push({ username, password, role });
    res.status(201).json({ message: 'User added successfully' });
});

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})