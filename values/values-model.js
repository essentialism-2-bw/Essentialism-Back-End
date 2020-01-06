const db = require('../database/dbConfig');

module.exports={
  getValues,
}

function getValues() {
  return db("values").select("id", "name");
}