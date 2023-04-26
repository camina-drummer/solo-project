const Session = require('../models/sessionModelMongo.js');
const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = (req, res, next) => {
  console.log(req.cookies.ssid);
  Session.findOne({ cookieId: req.cookies.ssid })
    .then(data => {
      // console.log('req.cookies.ssid: ', req.cookies);
      // console.log('Session.findOne: ', data);
      if (data) res.locals.loggedIn = true;
      return next();
    })
    .catch(err => next({ log: err, message: "You are not logged in." }))
};

/**
* startSession - create and save a new Session into the database.
*/
sessionController.startSession = (req, res, next) => {
  console.log(res.locals.ssid);
  Session.findOneAndUpdate({cookieId: res.locals.ssid}, {cookieId: res.locals.ssid}, {upsert: true, new: true})
    .then((data) => {
      console.log(data);
      return next();
    })
    .catch(err => next({ log: 'Error creating session document', message: 'Error loading session.'}));
};

sessionController.endSession = (req, res, next) => {
  Session.findOneAndDelete({cookieId: req.cookies.ssid})
    .then((data) => {
      console.log('Deleted: ', data);
      return next();
    })
    .catch(err => {
      console.log('Error deleting session document: ', err);
      return next();
    });
};

// // session schema for reference:
// const sessionSchema = new Schema({
//   cookieId: { type: String, required: true, unique: true },
//   createdAt: { type: Date, expires: 30, default: Date.now }
// });

module.exports = sessionController;
