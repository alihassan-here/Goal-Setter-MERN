const express = require('express');
const app = express();
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
connectDB();

const PORT = process.env.PORT || 5000;

//Middlewares
app.use(express.json());
//to encode URL
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));

//TO HANDLE ERRORS
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});