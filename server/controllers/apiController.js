const db = require('../models/userModel.js');
require('dotenv').config();

const apiController = {};

apiController.dbQuery = (req, res, next) => {
    const { query } = req.body;
    db.query(query)
        .then((data) => {
            res.locals.sqlResults = data.rows;
            return next();
        })
        .catch((err) => {
            return next(err);
        });
};

apiController.dbSave = (req, res, next) => {
    const ssid = req.cookies.ssid;
    const text = "SELECT _id, username FROM users WHERE ssid = $1"
    const values = [ssid];
    db.query(text, values)
    .then((data) => {
        // console.log(data.rows[0].username, data.rows[0]._id, req.body.query);
        const user_id = data.rows[0]._id;
        const story = req.body.query;

        const insertQuery = "INSERT INTO stories (user_id, story) VALUES ($1, $2)"
        const insertValues = [user_id, story];

        db.query(insertQuery, insertValues)
            .then((data) => {
                // console.log("Returned save query data: ", data);
                res.locals.sqlInsertResults = data.rowCount;
                return next();
            })
            .catch((err) => next({log: err, message: "Could not save."}));
    })
    .catch((err) => next({log: err, message: "Could not save."}));
};

apiController.dbLoad = (req, res, next) => {
    const ssid = req.cookies.ssid;
    const text = "SELECT s.story AS story FROM stories s JOIN users u ON u._id=s.user_id AND u.ssid=$1"
    const values = [ssid];
    db.query(text, values)
        .then((data) => {
            console.log(data.rows);
            res.locals.sqlSelectResults = data.rows;
            return next();
        })
        .catch((err) => next({log: err, message: "Could not load."}));
};

apiController.cgptQuery = (req, res, next) => {
    // Create CGPT query
    const query = `${req.body.query}. Keep your response under 150 words.`

    // Create JSON query object
    const apiQuery = JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: query}]
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