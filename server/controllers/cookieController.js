const User = require('../models/userModelMongo.js');
const cookieController = {};

/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setSSIDCookie = (req, res, next) => {
  if (res.locals.verified) {
    res.cookie('ssid', res.locals.ssid, { httpOnly: true });
    return next();
  } else {
    return next({ log: 'User not verified.', message: 'There was a problem logging in.'})
  }
}

module.exports = cookieController;