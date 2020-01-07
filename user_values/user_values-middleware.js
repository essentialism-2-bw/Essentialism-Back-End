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
  validTokenCheck,
  validBodyCheck,
  validBodyCheckArray,
  validUserCheckArray
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
}

// ********************************************************
// validBodyCheck
// This checks the body when it is one object
// The propts is an array of properties that the object should 
// contain
// ********************************************************
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


// ********************************************************
// validBodyCheckArray
// This checks the body when it is an array of objects.
// The propts is an array of properties that the object should 
// contain. The count is the number of elements in the body
// array
// ********************************************************
function validBodyCheckArray(propts,count) {
  return function (req,res,next) {
    const body = req.body;
    let isError = false;
    let errMsg = "";

    if(!Array.isArray(body) || body.length!==count) {
      isError = true;
      errMsg = `the body must be an array of ${count} objects only`;
    } 
    if(!isError) {
      body.forEach(elem=>{
        if(typeof(elem)!=='object') {
          isError = true;
          errMsg = `the array must only contain objects`;
        }
      })  
    }
    if(!isError) {
      body.forEach(bodyElem=>{
        propts.forEach(propElem=>{
          if(!bodyElem[propElem]) {
            isError = true;
            errMsg = `missing field ${propElem} in one or more objects in request body array`;
          }
        })
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



// ********************************************************
// validUserCheckArray
// This checks the user_id in the token and the user_id in each
// object of the body array is the same. This is to prevent
// one user from accessing/adding/modifying the data of another user
// ********************************************************
function validUserCheckArray(req,res,next) {
  const token_userId = "" + req.token.user_id;
  let isError = false;
  let bodyElem_userID;

  req.body.forEach(bodyElem=>{
    bodyElem_userID = "" + bodyElem.user_id;
    
    if(token_userId!==bodyElem_userID) {
      isError = true;
    }
  })

  if(isError) {
    res.status(400)
      .json({ message:`You are loggged in with user_id ${token_userId} but accessing data of different user_id` });
  }
  else {
    next();
  } 

}
