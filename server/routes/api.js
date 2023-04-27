const express = require('express');
const router = express.Router();

// Require in relevant controllers
const apiController = require('../controllers/apiController.js')

// CGPT queries
router.use('/cgpt', apiController.cgptQuery, (req, res) => {
    console.log("hit CGPT router")
    res.status(200).json(res.locals.cgptResults);
});

// SQL queries
router.use('/sql', apiController.dbQuery, (req, res) => {
    console.log("Hit end of SQL general query router");
    res.status(200).json(res.locals.sqlResults);
});

// Save to SQL
router.post('/save', apiController.dbSave, (req, res) => {
    console.log("Hit end of SQL save router");
    res.status(200).json(res.locals.sqlInsertResults);
});

router.get('/load', apiController.dbLoad, (req, res) => {
    console.log("Hit end of SQL load router");
    res.status(200).json(res.locals.sqlSelectResults);
});

module.exports = router;