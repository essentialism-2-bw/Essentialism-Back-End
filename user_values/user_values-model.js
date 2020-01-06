// ********************************************************
// Import database access
// ********************************************************
const db = require('../database/dbConfig');

// ********************************************************
// Exports
// ********************************************************
module.exports={
  getUserValues,
  addUserValue,
  getUserValue,
  updateUserValues
}


// ********************************************************
// getUserValues
// This get all the values for a given user_id
// ********************************************************
function getUserValues(user_id) {
  return db("user_values")
    .select("*")
    .where({user_id});
}


// ********************************************************
// addUserValue
// ********************************************************
function addUserValue(data) {
  return db("user_values")
    .insert(data,['id'])
    .then(([id]) => getUserValue(id));   
}


// ********************************************************
// getUserValue
// This gets one user_value record based on user_value id
// ********************************************************
function getUserValue(id) {
  return db("user_values")
  .select("*")
  .where({id})
  .first();  
}

// ********************************************************
// updateUserValues
// ********************************************************
function updateUserValues(data) {
  return db("user_values")
  .update(data)
  .where('id',data.id)
  .then(count=>{
    return (count>0 ? getUserValue(data.id) : null);
  });  
}