const axios = require('axios');

const Auth = require('../auth/auth-model');

const router = require('express').Router();

router.get('/', (req, res) => {
    Auth.getUsers()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({ message: "There was an error getting the list of users.", error:error });
        });
});

module.exports = router;
