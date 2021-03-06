const path = require('path');
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
app.use('/api/users', require('./routes/userRoutes'));

//serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/build')));
    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
        )
    )
} else {
    app.get('/', (req, res) => res.send("please set to production"))
}

//TO HANDLE ERRORS
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});