// ********************************************************
// Import External middleware
// ********************************************************
const jwt = require("jsonwebtoken");

// ********************************************************
// Import constants
// ********************************************************
const {jwtSecret} = require('../constants');


// ********************************************************
// ********************************************************
module.exports = {
  validTokenCheck
};


// ********************************************************
// validTokenCheck
// ********************************************************
function validTokenCheck(req, res, next) {
  const { authorization } = req.headers;

  if (authorization) {

    jwt.verify(authorization, jwtSecret, function(err, decodedToken) {
      if (err) {
        res.status(401).json({ message: "Invalid Token" });
      } else {
        req.token = decodedToken;

        next();
      }
    });
  } else {
    res.status(400).json({ message: "Please login first" });
  }
};
