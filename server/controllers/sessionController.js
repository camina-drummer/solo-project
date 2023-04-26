const Session = require('../models/sessionModelMongo.js');
const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = (req, res, next) => {
  console.log(req.cookies)
  // Session.findOne({ cookieId: req.cookies.ssid })
  //   .then(data => {
  //     console.log('req.cookies.ssid: ', req.cookies);
  //     console.log('Session.findOne: ', data);
  //     return next();
  //   })
  //   .catch(err => next({ error: err, log: 'sessionController.isLoggedIn issue' }))
  return next();
};

/**
* startSession - create and save a new Session into the database.
*/
sessionController.startSession = (req, res, next) => {
  Session.findOneAndUpdate({cookieId: res.locals.ssid}, {cookieId: res.locals.ssid, createdAt: Date.now }, {upsert: true, new: true})
    .then((data) => {
      console.log(data);
      return next();
    })
    .catch(err => next({ err: 'Error creating session document'}));
};

// const sessionSchema = new Schema({
//   cookieId: { type: String, required: true, unique: true },
//   createdAt: { type: Date, expires: 30, default: Date.now }
// });

module.exports = sessionController;
