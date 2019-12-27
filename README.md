# Essentialism-Back-End
Repository for the back end of the essentialism project

## Instructions for Endpoints

**Test if your axios call is working**
GET request to https://essentialism-2.herokuapp.com/
- [ ] response should be the string "App is working 👍"

**Registering a new user**

POST request to https://essentialism-2.herokuapp.com/api/auth/register
- [ ] req.body should be in the form of {"username": "Bob", "password": "123"}.
- [ ] on successful registration, the response should be 201 and in the form of { "id": #, "username": "Bob" }

**Logging in as a user**

POST request to https://essentialism-2.herokuapp.com/api/auth/login
- [ ] req.body should be in the form of {"username": "Bob", "password": "123"}.
- [ ] on successful registration, the response should be 200 and in the form of {"token": "###", "message": "Welcome Bob!"}
- [ ] please make sure to store the token for usage in accessing the protected parts of the site
- [ ] the token is valid for 12 hours

**Getting a list of users**

GET request to https://essentialism-2.herokuapp.com/api/users
- [ ] req.headers should be in the form of {"Authorization": "###"}.
- [ ] the authorization is the token obtained by logging in as a user (see above)
- [ ] on success, the response should be 200 and in the form of [ { "id": #, "username": "username" }, { "id": #, "username": "username" }, ... ]
