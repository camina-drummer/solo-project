const User = require('../models/userModelMongo.js');

const userController = {};

/**
 * getAllUsers - retrieve all users from the database and stores it into res.locals
 * before moving on to next middleware.
 */
userController.getAllUsers = (req, res, next) => {
	User.find({}, (err, users) => {
		// if a database error occurs, call next with the error message passed in
		// for the express global error handler to catch
		if (err)
			return next(
				'Error in userController.getAllUsers: ' + JSON.stringify(err)
			);

		// store retrieved users into res.locals and move on to next middleware
		res.locals.users = users;
		return next();
	});
};

/**
 * createUser - create and save a new User into the database.
 */
userController.createUser = async (req, res, next) => {
	// write code here
	try {
		await User.create(req.body);
		return next();
	} catch {
		return next({ error: 'User not created' });
	}
};

/**
 * verifyUser - Obtain username and password from the request body, locate
 * the appropriate user in the database, and then authenticate the submitted password
 * against the password stored in the database.
 */
userController.verifyUser = async (req, res, next) => {
	console.log(req.body);
	try {
		
		const foundUser = await User.findOne({ username: req.body.username })
		res.locals.verified = false;
		
		if (req.body.password === foundUser.password) {
			// console.log('Succesful password comparison');
			res.locals.verified = true;
			res.locals.ssid = foundUser._id.toString();
			return next();
		} else {
			return res.redirect('/');
		}
	} catch {
		return next({ error: 'Find user request failed!' })
	}
};

module.exports = userController;
