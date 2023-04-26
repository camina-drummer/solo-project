const express = require('express');
const router = express.Router();

// Require in relevant controllers
const apiController = require('../controllers/apiController.js')

// CGPT queries
router.use('/cgpt', apiController.cgptQuery, (req, res, next) => {
    console.log("hit CGPT router")
    res.status(200).json(res.locals.cgptResults);
});

// SQL queries
router.use('/sql', apiController.dbQuery, (req, res, next) => {
    console.log("hit SQL router")
    res.status(200).json(res.locals.sqlResults);
});

module.exports = router;