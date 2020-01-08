const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const valuesRouter = require('../values/values-router');
const user_valuesRouter = require('../user_values/user_values-router');
const projectsRouter = require('../projects/projects-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', authenticate, usersRouter);
server.use('/api/values', valuesRouter);
server.use('/api/usrValues', user_valuesRouter);
server.use('/api/projects', projectsRouter);


server.get("/", function(req, res) {
    res.send("App is working 👍");
});

module.exports = server;
