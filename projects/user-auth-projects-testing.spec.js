const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig");
const Auth = require("../auth/auth-model");
const UserVal = require("../user_values/user_values-model");
const Proj = require("./projects-model");
const bcrypt = require('bcryptjs');

const {hashRounds} = require('../constants');

// USER LIST TESTING

describe("user router", function() {
    beforeEach(async () => {
        await db("users").truncate();
    });

    describe("environment", function() {
        it("should set environment to testing", function() {
        expect(process.env.DB_ENV).toBe("testing");
        });
    });

    describe("check if API works", function() {
        it("should return a App is working 👍", function() {
        return request(server)
            .get("/")
            .then(res => {
            expect(res.status).toBe(200);
            });
        });
    });

    describe('getting a list of users', () => {
        it('should provide a list of users if a token is given', async () => {

            await Auth.registerUser({username: 'newAccount1', password: bcrypt.hashSync('pass', hashRounds)});

            const credentials = {username: 'newAccount1', password: 'pass'};

            return request(server)
            .post("/api/auth/login")
            .send(credentials)
            .then(res => {
                const loginToken = res.body.token;
                return request(server)
                .get("/api/users")
                .set('Authorization', `${loginToken}`)
                .then(res => {
                    expect(res.status).toBe(200);
                    expect(res.body.length).toBe(1);
                })
            });
        });
    });
});

// AUTH ROUTER TESTING

describe("auth router and model", function() {
    beforeEach(async () => {
        await db("users").truncate();
    });

    describe("environment", function() {
        it("should set environment to testing", function() {
        expect(process.env.DB_ENV).toBe("testing");
        });
    });

    describe('registering and logging in', () => {

        it('adds users into the db', async () => {

            let userNumber;

            userNumber = await db('users');

            expect(userNumber).toHaveLength(0);
            await Auth.registerUser({username: 'user1', password: bcrypt.hashSync('qaz', hashRounds)});

            userNumber = await db('users');

            expect(userNumber).toHaveLength(1);
        });

        it('allows users to register and login and provides a token', async () => {

            const newAccount = {username: 'newAccount', password: 'pass'};

            return request(server)
            .post("/api/auth/register")
            .send(newAccount)
            .then(res => {
                // check if registration worked
                expect(res.status).toBe(201);

                // login
                return request(server)
                .post("/api/auth/login")
                .send(newAccount)
                .then(res => {
                    // check if logging in worked
                    expect(res.status).toBe(200);
                    expect(res.body.message).toBe(`Welcome ${newAccount.username}!`);
            });
            });
        });

    });

});

// PROJECT ROUTER TESTING

describe("project router and model", function() {
    beforeEach(async () => {
        await db("users").truncate();
        await db("user_values").truncate();
        await db("projects").truncate();
    });

    describe("environment", function() {
        it("should set environment to testing", function() {
        expect(process.env.DB_ENV).toBe("testing");
        });
    });

    describe('add project function', () => {
        it('preforms CRUD operations for projects', async () => {

            let projNumber;

            projNumber = await db('projects');
            expect(projNumber).toHaveLength(0);

            // Add a user
            await Auth.registerUser({username: 'user1', password: bcrypt.hashSync('qaz', hashRounds)});
            users = await db('users');

            // Add a user value
            await UserVal.addUserValue([{user_id: 1, value_name:"Health", color: "blue", importance_description: "blah blah blah"},
            {user_id: 1, value_name:"Health2", color: "blue", importance_description: "blah blah blah"},
            {user_id: 1, value_name:"Health3", color: "blue", importance_description: "blah blah blah"}]);
            values = await db('user_values');

            // Add a project
            await Proj.addProject({user_id: 1, user_values_id: 1, project_title: "Work out", project_description: "Lift weights and run every morning"});

            projNumber = await db('projects');

            // Test if project was added
            expect(projNumber).toHaveLength(1);

            // Testing CRUD
            return request(server)
            .post("/api/auth/login")
            .send({username: 'user1', password: "qaz"})
            .then(res => {
                const loginToken = res.body.token;
                // GET a list of projects
                return request(server)
                .get("/api/projects/1")
                .set('Authorization', `${loginToken}`)
                .then(res => {
                    expect(res.status).toBe(200);
                    expect(res.body.length).toBe(1);
                    // ADD a project
                    return request(server)
                    .post("/api/projects/1")
                    .set('Authorization', `${loginToken}`)
                    .send({user_id: 1, user_values_id: 1, project_title: "Yoga", project_description: "Do yoga in the evening"})
                    .then(res => {
                        expect(res.status).toBe(201);
                        // EDIT a project
                        return request(server)
                        .put("/api/projects/1/1")
                        .set('Authorization', `${loginToken}`)
                        .send({user_id: 1, user_values_id: 1, project_title: "Work out", project_description: "Lift weights and run every morning", completed: "true"})
                        .then(res => {
                            expect(res.status).toBe(201);
                            expect(res.body.completed).toBe("true");
                            // DELETE a project
                            return request(server)
                            .delete("/api/projects/1/1")
                            .set('Authorization', `${loginToken}`)
                            .then(res => {
                                expect(res.status).toBe(201);
                            })
                        })
                    })
                })
            });
        });
    });


});