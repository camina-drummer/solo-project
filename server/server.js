const path = require('path');
const express = require('express')

const app = express();

// Require in routers
const apiRouter = require('./routes/api.js');

const PORT = 3000;

// Parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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