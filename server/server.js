const path = require('path');
const express = require('express')
require('dotenv').config();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();

// Require in routers, connect to MongoDB and declare PORT
const apiRouter = require('./routes/api.js');
mongoose.connect(process.env.MDB_URI);
const PORT = 3000;

// Require in user, cookie, and session controllers
const userController = require('./controllers/userController.js');
const cookieController = require('./controllers/cookieController.js');
const sessionController = require('./controllers/sessionController.js');

// Parse request body and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Login route
app.use('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
    // what should happen here on successful log in?
    console.log('Successful login, loading page')
    res.status(200).send('Logging in...');
});

// Routing for API calls
app.use('/api', apiRouter);

app.use('/build', () => {
    res.status(200).sendFile(path.join(__dirname, '../build'));
});


// Default routes
app.use('/', (req, res) => {
    console.log('Hit end of / route, serving index.html');
    res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});


// Global error handler
const defaultErr = {
    log: 'A middleware error occurred',
    status: 400,
    message: { err: 'An error occurred' },
}

app.use((err, req, res, next) => {
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

// Start server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

// What does this do here?
module.exports = app;