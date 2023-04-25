const db = require('../models/userModel.js');
require('dotenv').config();

const apiController = {};

// apiController.dbQuery = (req, res, next) => {
//     const { query } = res.locals;
//     db.query(query)
//         .then((data) => {
//             // console.log(data);
//             res.locals.records = data.rows;
//             return next();
//         })
//         .catch((err) => {
//             return next(err);
//         });
// };

apiController.cgptQuery = (req, res, next) => {
    // Create CGPT query
    const query = `${req.body.query}. Keep your response under 150 words.`

    // Create JSON query object
    const apiQuery = JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: req.body.query}]
          });
    console.log(apiQuery);
    // Create authorization string
    const authString = `Bearer ${process.env.CGPT_TOKEN}`;
    // Create CGPT API fetch request using query object and authorization string
    fetch('https://api.openai.com/v1/chat/completions', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authString
        },
        body: apiQuery
    })
        .then((data) => data.json())
        .then((parsed) => {
            res.locals.cgptResults = parsed.choices;
            console.log(res.locals.cgptResults);
            return next();
        })
        .catch((err) => next(err));
}; 

module.exports = apiController;