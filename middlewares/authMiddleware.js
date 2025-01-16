const expressJwt = require('express-jwt')

// JWT authentication middleware
function authenticate(req, res, next) {
    const secret = process.env.JWT_SECRET || 'your_secret_key'
    
    // Use express-jwt to verify the token from the Authorization header
    expressJwt({
        secret: secret,
        algorithms: ['HS256'],  // the algorithm must be the same as that used in jwt.sign()
    })(req, res, next)
}

module.exports = authenticate