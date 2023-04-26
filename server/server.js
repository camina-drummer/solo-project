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

// Login and logout routes
app.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
    console.log('Successful login, loading page')
    return res.redirect('/checkloginstatus');
});

app.use('/checkloginstatus', sessionController.isLoggedIn, (req, res) => {
    if (res.locals.loggedIn) res.status(200).json({ loggedIn: true });
    else res.status(400).json({ loggedIn: false });
})

app.get('/logout', sessionController.endSession, (req, res) => {
    console.log('Successful logout, unloading components')
    res.status(200).json({ loggedIn: false });
});

// Signup route
app.post('/signup', userController.createUser, userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
	// create and store a user in our db
	console.log('Succesful signup, loading page');
	return res.redirect('/checkloginstatus');
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
    message: 'An error occurred',
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