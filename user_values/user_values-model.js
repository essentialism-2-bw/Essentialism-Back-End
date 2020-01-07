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
  updateUserValues,
  deleteUserValues
}


// ********************************************************
// getUserValues
// This gets all the values for a given user_id
// ********************************************************
function getUserValues(user_id) {
  return db("user_values")
    .select("*")
    .where({user_id});
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
// addUserValue
// ********************************************************
function addUserValue(data) {
  return db("user_values")
    .insert(data)
    .then(([id])=>{
      return (id>0 ? getUserValues(data[0].user_id) : null);
    });   
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


// ********************************************************
// deleteUserValues
// ********************************************************
function deleteUserValues(user_id) {
  return db("user_values")
    .where('user_id',user_id)
    .del();
}