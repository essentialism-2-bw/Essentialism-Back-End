# Essentialism-Back-End
Repository for the back end of the essentialism project

## Instructions for Endpoints

**Registering a new user**

POST request to http://localhost:4004/api/auth/register
- [ ] req.body should be in the form of {"username": "Bob", "password": "123"}.
- [ ] on successful registration, the response should be 201 and in the form of { "id": #, "username": "Bob" }

**Logging in as a user**

POST request to http://localhost:4004/api/auth/login
- [ ] req.body should be in the form of {"username": "Bob", "password": "123"}.
- [ ] on successful registration, the response should be 200 and in the form of {"token": "###", "message": "Welcome Bob!"}
- [ ] please make sure to store the token for usage in accessing the protected parts of the site
- [ ] the token is valid for 12 hours

**Getting a list of users**

GET request to http://localhost:4004/api/users
- [ ] req.headers should be in the form of {"Authorization": "###"}.
- [ ] the authorization is the token obtained by logging in as a user (see above)
- [ ] on success, the response should be 200 and in the form of [ { "id": #, "username": "username" }, { "id": #, "username": "username" }, ... ]
