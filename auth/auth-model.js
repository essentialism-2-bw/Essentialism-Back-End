const db = require('../database/dbConfig');

module.exports={
    getUsers,
    getUserById,
    getUsersBy,
    registerUser,
}

function getUsers() {
    return db("users").select("id", "username");
}

function getUserById(id) {
    return db("users")
        .select("id", "username")
        .where({ id })
        .first();
}

function getUsersBy(filter) {
    return db("users")
        .select("id", "username", "password") // make sure to return the password
        .where(filter);
}

function registerUser(user) {
    return db("users")
    .insert(user, "id")
    .then(ids => {
        const [id] = ids;
        return getUserById(id);
    });
}