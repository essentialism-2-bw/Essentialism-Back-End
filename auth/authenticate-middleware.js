const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const {jwtSecret} = require('../constants');


module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (authorization) {
        // const secret = process.env.JWT_SECRET || 'Essentialism Secret 123';
        const secret = jwtSecret;

        jwt.verify(authorization, secret, function( err, decodedToken ) {
        if (err) {
            res.status(401).json({ message: "Invalid Token" });
        } else {
            req.token = decodedToken;
    
            next();
        }
        });
    } else {
        res.status(401).json({ message: "Please login and try again" });
    }
}
