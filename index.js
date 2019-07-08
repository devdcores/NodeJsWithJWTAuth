const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//import Routes
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');

//To pass values through environment variables.

dotenv.config();

//connect to mongoose
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => {
        console.log('Connected to DB!')
    });

//Middleware
app.use(express.json());

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postsRoute);

app.listen(3000, () => console.log('Server up and running!!'))