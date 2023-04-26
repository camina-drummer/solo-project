const User = require('../models/userModelMongo.js');
const cookieController = {};

/**
* setCookie - set a cookie with a random number
*/
cookieController.setCookie = (req, res, next) => {
  // write code here
  res.cookie('codesmith', 'hi', { httpOnly: true });
  return next();
}

/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setSSIDCookie = (req, res, next) => {
  if (res.locals.verified) {
    res.cookie('ssid', res.locals.ssid, { httpOnly: true });
    return next();
  } else {
    res.redirect('/');
    return next({ error: 'Login information incorrect.'})
  }
}

module.exports = cookieController;