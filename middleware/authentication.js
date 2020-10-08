const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const users = require('../controllers/user-ctrl');

dotenv.config();
const SECRET = process.env.JWT_SECRET;

function authenticate(req, res, next) {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		const error = new Error('Unauthorised!');
		error.status = 400;
		next(error);
	}
	try {
		// line 12 exits from function if the above error
		//runs so we dont need an if statement??

        const token = authHeader.replace('Bearer ', '');
        console.log("token:  ", token)
        const tokenData = jwt.verify(token, SECRET);
        console.log("tokenData: ", tokenData);
        req.user = tokenData.user;
        next()
        
        // User.findOne({ _id: tokenData.user }, (err, user) => {
        //     if (err) {
        //       return res.status(404).json({
        //         err,
        //         message: "User not found!",
        //       });
        //     
            
        //}
        
	// 	users
	// 		.getUserByID(tokenData.user_id) //fixed already
	// 		.then(user => {
	// 			console.log(user)
	// 			req.user = user;
	// 			next();
	// 		})
	// 		.catch(next);
	} catch (_) {
		// replaced underscore with error
		// TO-DO: check error is unauth; if not return different error!
		const error = new Error('Unauthorized');
		error.status = 401;
		next(error);
	}
}

module.exports = authenticate;