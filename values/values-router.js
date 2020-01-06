// ********************************************************
// Import External middleware
// ********************************************************
const router = require('express').Router();

// ********************************************************
// Import database access
// ********************************************************
const dbVal =  require('./values-model');

// ********************************************************
//Import custom middleware
// ********************************************************
const {validTokenCheck} = require('./values-middleware');

// ********************************************************
// Export router
// ********************************************************
module.exports = router;


// ********************************************************
// GET /api/values
// ********************************************************
router.get('/', validTokenCheck, (req,res)=>{
  dbVal.getValues()
    .then(vals=>{
      res.status(200).json(vals);
    })
    .catch(error=>{
      res.status(500).json({ message: "There was an error getting the list of values.", error:error });
    })
})

