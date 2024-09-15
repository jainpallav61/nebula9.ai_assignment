const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require("cors");


dotenv.config();
connectDB();

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
}

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

const authRoutes = require('./routes/auth');
const draftRoutes = require('./routes/drafts');

app.use('/api/auth', authRoutes);
app.use('/api/drafts', draftRoutes);

app.get("/", (req, res)=>{
    res.send("hello")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
