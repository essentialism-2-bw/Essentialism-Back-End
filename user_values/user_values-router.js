// ********************************************************
// Import External middleware
// ********************************************************
const router = require('express').Router();

// ********************************************************
// Import database access
// ********************************************************
const dbUsrVals =  require('./user_values-model');

// ********************************************************
// Import custom middleware
// ********************************************************
const {validTokenCheck,validBodyCheck,getUserValue,updateUserValues} = require('./user_values-middleware');

// ********************************************************
// Export router
// ********************************************************
module.exports = router;


// ********************************************************
// GET /api/usrValues/:id
// ********************************************************
router.get('/:id',validTokenCheck,(req,res)=>{
  const token_userId = "" + req.token.user_id;
  const params_userID = req.params.id;
  if(token_userId===params_userID) {
    dbUsrVals.getUserValues(params_userID)
      .then(usrVals=>{
        res.status(200).json(usrVals);
      })
      .catch(err=>{
        res.status(500).json({ message: "Error getting the user_values.", error:err });
      })
  }
  else {
    res
      .status(403)
      .json({message:`Logged on with userId ${token_userId}, cannot get data on user with userId ${params_userID}`});
  }
})

// ********************************************************
// POST /api/usrValues/
// ********************************************************
router.post('/',
  validTokenCheck,
  validBodyCheck(["user_id","value_name"]),
  (req,res)=>{
    const token_userId = "" + req.token.user_id;
    const body_userID = "" + req.body.user_id;
    if(token_userId===body_userID) {
      dbUsrVals
        .addUserValue(req.body)
        .then(usrVal=>{
          res.status(201).json(usrVal);
        })
        .catch(err=>{
          res.status(500).json({ message: "Error adding the user_value.", error:err });
        });
    }
    else {
      res
      .status(403)
      .json({message:`Logged on with userId ${token_userId}, cannot add data for user with userId ${body_userID}`});
    }
})


// ********************************************************
// PUT /api/usrValues/
// ********************************************************
router.put('/',
  validTokenCheck,
  validBodyCheck(["user_id","value_name","id"]),
  (req,res)=>{
    const token_userId = "" + req.token.user_id;
    const body_userID = "" + req.body.user_id;
    if(token_userId===body_userID) {
      dbUsrVals.getUserValue(req.body.id)
        .then(usrVal=>{
          if(usrVal) {
            const usrVal_userID = "" + usrVal.user_id;
            if(body_userID===usrVal_userID) {

              dbUsrVals.updateUserValues(req.body)
                .then(usrValUpD=>{
                  res.status(200).json(usrValUpD);
                })
                .catch(err=>{
                  res.status(500).json({ message: "Error 2 updating the user_value.", error:err });
                });

              // console.log("in PUT & usrVal is:",usrVal)
            }
            else {
              res
                .status(403)
                .json({message:`Record with id ${req.body.id} is in user_values table `+
                  `but is for user with id ${usrVal_userID} `+ 
                  `and you are logged on as user with id ${body_userID}`});
            }            
          }
          else {
            res.status(404).json({message:`Record with id ${req.body.id} not found in user_values table`})
          }        
        }) 
        .catch(err=>{
          res.status(500).json({ message: "Error 1 updating the user_value.", error:err });
        });    
    }
    else {
      res
      .status(403)
      .json({message:`Logged on with userId ${token_userId}, cannot update data for user with userId ${body_userID}`});
    }
})


// ********************************************************
// DELETE /api/usrValues/
// ********************************************************
