const express = require('express');
const router = express.Router();

// Require in relevant controllers
const apiController = require('../controllers/apiController.js')

// // Testing for DB queries, fill in other middleware
// router.get('/', apiController.cgptStoryQuery, apiController.dbQuery, (req, res) => {
//     console.log('Hit / get router in api.js');
//     console.log(res.locals.records);
//     res.status(200).json(res.locals.records);
// });

router.use('/', apiController.cgptQuery, (req, res) => {
    res.status(200).json(res.locals.cgptResults);
});

module.exports = router;