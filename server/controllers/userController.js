const User = require('../models/userModelMongo.js');
const db = require('../models/userModel.js')

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
			return next({ log: err, message: 'Something went wrong.'});
		// store retrieved users into res.locals and move on to next middleware
		res.locals.users = users;
		return next();
	});
};

/**
 * createUser - create and save a new User into the database.
 */
userController.createUser = async (req, res, next) => {
	try {
		const found = await User.findOne({ username: req.body.username });
		if (!found) {
			const newUser = await User.create(req.body);
			console.log("Created user:", newUser);
			if (newUser._id) {
				const { username, password } = req.body;
				const ssid = newUser._id.toString();
				res.locals.ssid = ssid;

				const text = "INSERT INTO users (username, password, ssid) VALUES ($1, $2, $3)"
				const values = [username, password, ssid];
				db.query(text, values)
        .then((data) => {
						console.log("SQL result", data)
            return next();
        })
				.catch(err => next({log: err, message: "Something went wrong."}))
			} else {
				return next({log: newUser, message: "An error occurred."});
			}
		} else {
			return next({ log: `User already exists:\n${found}`, message: 'User already exists'});
		}
	} catch (error) {
		return next({ log: error,  message: 'User not created'});
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
		if (!foundUser) return next({ log: 'User not found.', message: 'Could not verify username or password.'});
		
		if (req.body.password === foundUser.password) {
			res.locals.verified = true;
			res.locals.ssid = foundUser._id.toString();
			return next();
		} else {
			return next({ log: 'User password incorrect.', message: 'Could not verify username or password.'});
		}
	} catch (error) {
		return next({ log: error, message: 'Could not verify username or password.' })
	}
};

module.exports = userController;
