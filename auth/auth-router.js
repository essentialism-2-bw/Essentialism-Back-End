const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const Auth = require('./auth-model');

const {hashRounds,jwtSecret} = require('../constants');

// Middleware

function validateNewUser(req, res, next) {
    let { username, password } = req.body;

    if (req.body && req.body.username && req.body.password && Object.keys(req.body).length === 2) {
        Auth.getUsersBy({ username })
        .then(users => {
            if(users.length > 0) {
                res.status(400).json({ message: `${username} already has an account.` });
            } else {
                next();
            }
        })
        .catch(error => {
            res.status(500).json({message: "There was an error registering the user", error: error});
        });
    } else if(Object.keys(req.body).length !== 2) {
        res.status(400).json({ message: "Please provide only a username and a password field in your request and nothing else." });
    } else {
        res.status(400).json({ message: "Please provide both a username and a password field in your request." });
    }
}

function validateReturningUser(req, res, next) {
    if (req.body && req.body.username && req.body.password && Object.keys(req.body).length === 2) {
        next();
    } else if(Object.keys(req.body).length !== 2) {
        res.status(400).json({ message: "Please provide only a username and a password field in your request and nothing else." });
    } else {
        res.status(400).json({ message: "Please provide both a username and a password field in your request." });
    }
}

// CRUD

router.post('/register', validateNewUser, (req, res) => {
    let user = req.body;
        const hash = bcrypt.hashSync(user.password, hashRounds); // 2 ^ n
        user.password = hash;

    Auth.registerUser(user)
        .then(saved => {
        res.status(201).json(saved);
        })
        .catch(error => {
        res.status(500).json({ message: "error registering user", error: error });
        });
});

router.post('/login', validateReturningUser, (req, res) => {
    let { username, password } = req.body;

    Auth.getUsersBy({ username })
        .first()
        .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            //sign token
            const token = signToken(user);

            res.status(200).json({
            token,
            message: `Welcome ${user.username}!`,
            });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
        })
        .catch(error => {
        res.status(500).json({message: "there was an error"});
        });
});

function signToken(user) {
    const payload = {
        user_id: user.id,
        username: user.username,
    };

    // const secret = process.env.JWT_SECRET || 'Essentialism Secret 123'
    const secret = jwtSecret;

    const options = {
        expiresIn: '12h',
    }

    return jwt.sign(payload, secret, options);
}

module.exports = router;
