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

        const insertQuery = "INSERT INTO stories (user_id, story) VALUES ($1, $2) RETURNING *;"
        const insertValues = [user_id, story];

        db.query(insertQuery, insertValues)
            .then((data) => {
                console.log("Returned save query data 1: ", data.rows[0]._id);
                res.locals.sqlInsertResults = data.rowCount;

                if (Object.hasOwn(req.body, "imageUrl") && data.rows[0]._id) {   
                    console.log("Entering image save if statement");
                    const insertImageQuery = "INSERT INTO images (story_id, image) VALUES ($1, $2) RETURNING *;";
                    const story_id = data.rows[0]._id;
                    const image = `${req.body.imageUrl}`;
                    const insertImageValues = [story_id, image];
                    console.log(insertImageValues);
                    console.log(JSON.stringify(image));
                    db.query(insertImageQuery, insertImageValues)
                    .then((data) => {
                        console.log("Logging image insert response: ", data);
                        return next();
                    })
                    .catch((err) => next({ log: err, message: "Could not save image."}))
                } else {
                    return next();
                }
            })
            .catch((err) => next({log: err, message: "Could not save story."}));
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
    const query = `Keep the length of your response under 900 characters. Make me a dungeons and dragons character backstory for a ${req.body.query}.`

    // Create JSON query object
    const apiQuery = JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: query}]
          });
    // console.log(apiQuery);
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

apiController.dalleQuery = (req, res, next) => {
    // Create DALLE query
    const query = "Oil painting of this fantasy character: ".concat("", req.body.query).slice(0, 900);
    console.log(query);
    // Create authorization string
    const authString = `Bearer ${process.env.CGPT_TOKEN}`;
    // Create JSON query object
    const apiQuery = JSON.stringify({
        "prompt": query,
        "n": 1,
        "size": "1024x1024"
      });
    // Make fetch request
    fetch('https://api.openai.com/v1/images/generations', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authString
        },
        body: apiQuery
    })
    .then((data) => data.json())
    .then((parsed) => {
        console.log(parsed);
        res.locals.dalleResults = parsed.data;
        console.log(res.locals.dalleResults);
        return next();
    })
    .catch((err) => next({ log: err, message: "Error generating image."}));
}


module.exports = apiController;