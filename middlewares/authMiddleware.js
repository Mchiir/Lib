const { expressjwt: jwt } = require("express-jwt");

// JWT authentication middleware
function authenticateJWT(req, res, next) {
    const secret = process.env.JWT_SECRET || 'your_secret_key';

    // // Get the token from Authorization header (it includes "Bearer " prefix)
    // const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // This will get the token after "Bearer"

    // if (!token) {
    //     return res.status(401).json({ message: 'Access denied. No token provided.' });
    // }

    console.log(req)

    // Use express-jwt as middleware to verify the token from the Authorization header
    jwt({
        secret: secret,
        algorithms: ['HS256'],  // the algorithm must match the one used in jwt.sign()
    })(req, res, next);
}

module.exports = authenticateJWT;