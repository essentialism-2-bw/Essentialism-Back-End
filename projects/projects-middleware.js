const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const {jwtSecret} = require('../constants');

module.exports = {
    validTokenAndUserCheck,
    validBodyCheck,
};


function validTokenAndUserCheck(req, res, next) {
    const { authorization } = req.headers;

    if (authorization) {

        jwt.verify(authorization, jwtSecret, function(err, decodedToken) {
            if (err) {
                res.status(401).json({ message: "Invalid Token" });
            } else if(decodedToken.user_id !== Number(req.params.id)) {
                // checks if the token does not belong to the user for which projects are being pulled
                res.status(401).json({ message: "Wrong user is logged in." });
            } else {
                // token is valid and it is for the user for which projects are being pulled
                req.token = decodedToken;
                next();
            }
    });
    } else {
        res.status(400).json({ message: "Please login first" });
    }
}

function validBodyCheck(propts) {
    return function (req,res,next) {
        const body = req.body;
        let isError = false;
        let errMsg = "";

        if(Object.keys(body).length === 0) {
            isError = true;
            errMsg = "missing request body";
        } 
        else if(!isError) {
            propts.forEach(elem=>{
                if(!body[elem]) {
                    isError = true;
                    errMsg = `missing field ${elem} in request body`;
                }
            })  
        }
    
        if(isError) {
            res.status(400).json({ message: errMsg });
        }
        else {
            next();
        }    
    }
}
