# Essentialism-Back-End
Repository for the back end of the essentialism project

## Instructions for Endpoints

**Test if your axios call is working**

GET request to https://essentialism-2.herokuapp.com/
- [ ] response should be the string "App is working 👍"

## Authentication

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

## Projects

**Getting a list of projects**

GET request to https://essentialism-2.herokuapp.com/api/projects/:id
- [ ] req.headers should be in the form of {"Authorization": "###"}.
- [ ] the :id in the URL is the user id of the user for which you would like to get a list of projects for
- [ ] the authorization will only work if the id of the user who logged in is the same as the ":id" in the URL (for security reasons)
- [ ] on success, the response should be 200 and in the form of: 
[
  {
    "id": 1,
    "user_id": 1,
    "project_title": "Work out",
    "project_description": "Lift weights every morning for 30 minutes.",
    "user_values_id": 1
  },
  {
    "id": 2,
    "user_id": 1,
    "project_title": "Run",
    "project_description": "Run 3 miles every morning!",
    "user_values_id": 1
  },
  {
    "id": 3,
    "user_id": 1,
    "project_title": "Read the news",
    "project_description": "Browse news websites with breakfast to stay up to date on the happenings",
    "user_values_id": 2
  },
]

**Adding a project to a user's list**

POST request to https://essentialism-2.herokuapp.com/api/projects/:id
- [ ] req.headers should be in the form of {"Authorization": "###"}.
- [ ] req.body should be in the form of: 
{
  "user_id": 1,
  "project_title": "test123",
  "project_description": "test123",
  "user_values_id": 2
}
- [ ] the :id in the URL is the user id of the user for which you would like to add a project for
- [ ] the authorization will only work if the id of the user who logged in is the same as the ":id" in the URL (for security reasons)
- [ ] the id of the user_value provided in the request must belong to the user
- [ ] on success, the response should be 200 and in the form of: 
{
  "id": 2,
  "user_id": 1,
  "project_title": "test123",
  "project_description": "test123",
  "user_values_id": 2
}

**Editing a project in the user's list**

PUT request to https://essentialism-2.herokuapp.com/api/projects/:id/:project_id
- [ ] req.headers should be in the form of {"Authorization": "###"}.
- [ ] req.body should be in the form of: 
{
  "user_id": 1,
  "project_title": "blah",
  "project_description": "blah blah blah",
  "user_values_id": 2
}
- [ ] the :id in the URL is the user id of the user for which you would like to add a project for
- [ ] the :project_id in the URL is the id of the project which the user would like to edit
- [ ] the authorization will only work if the id of the user who logged in is the same as the ":id" in the URL (for security reasons)
- [ ] the id of the project provided in the URL must belong to the user
- [ ] on success, the response should be 200 and in the form of: 
{
  "id": 2,
  "user_id": 1,
  "project_title": "blah",
  "project_description": "blah blah blah",
  "user_values_id": 2
}

**Deleting a project in the user's list**

DELETE request to https://essentialism-2.herokuapp.com/api/projects/:id/:project_id
- [ ] req.headers should be in the form of {"Authorization": "###"}.
- [ ] req.body is not required.
- [ ] the :id in the URL is the user id of the user for which you would like to add a project for
- [ ] the :project_id in the URL is the id of the project which the user would like to edit
- [ ] the authorization will only work if the id of the user who logged in is the same as the ":id" in the URL (for security reasons)
- [ ] the id of the project provided in the URL must belong to the user
- [ ] on success, the response should be 200 and in the form of: 
{
  "id": 2
}

## Values

**Getting the values from the values table**

GET request to https://essentialism-2.herokuapp.com/api/values
- [ ] req.headers should be in the form of {"Authorization": "token"}.
- [ ] on success, the response should be 200 and in the form of: 
[
  {
    "id": 1,
    "name": "Faith"
  },
  {
    "id": 2,
    "name": "Rigor"
  }
  ...
]

## User_Values

**Getting the user_values of a user from the user_values table**

GET request to https://essentialism-2.herokuapp.com/api/usrValues/:id
- [ ] req.headers should be in the form of {"Authorization": "token"}.
- [ ] id in the path is the user id
- [ ] on success, the response should be 200 and in the form of: 
[ {"id":1,"user_id":1,"value_name":"Faith","importance_description":"…description_text…","color":"blue"}, {"id":2, "user_id":1,"value_name":" Rigor ","importance_description":"…description_text…","color":"red"}, …
]

**Inserting user_values for a user into the user_values table**

POST request to https://essentialism-2.herokuapp.com/api/usrValues
- [ ] req.headers should be in the form of {"Authorization": "token"}.
- [ ] the req.body should be of the form:
[ { "user_id":1,"value_name":"Faith","color":"blue","importance_description":"…description_text…"}, { "user_id":1,"value_name":"Hope","color":"green","importance_description":"…description_text…"}, { "user_id":1,"value_name":"Charity","color":"orange","importance_description":"…description_text…"} ]
- [ ] Note that the request body is an array of 3 objects. So you put 3 records into the table for one POST request
- [ ] on success, the response should be 201 and in the form of: 
[ { "id":5,"user_id":1,"value_name":"Faith","color":"blue","importance_description":"…description_text…"}, { "id":6,"user_id":1,"value_name":"Hope","color":"green","importance_description":"…description_text…"}, { "id":7,"user_id":1,"value_name":"Charity","color":"orange","importance_description":"…description_text…"} ]


**Updating a user_values record in the user_values table**

PUT request to https://essentialism-2.herokuapp.com/api/usrValues
- [ ] req.headers should be in the form of {"Authorization": "token"}.
- [ ] the req.body should be of the form:
{ "id":1,"user_id":6,"value_name":"Faith","color":"blue","importance_description":"…description_text…"}
- [ ] on success, the response should be 200 and in the form of: 
{ "id":1,"user_id":6,"value_name":"Faith","color":"blue","importance_description":"…description_text…"}


**Deleteing user_values records for a user in the user_values table**

DELETE request to https://essentialism-2.herokuapp.com/api/usrValues
- [ ] req.headers should be in the form of {"Authorization": "token"}.
- [ ] the req.body should be of the form:
{ "user_id":6"}
- [ ] on success, the response should be 200 and in the form of: 
{"message": "Deleted 6 records of user_id 9"}
- [ ] NOTE THAT THIS DELETES ALL THE RECORDS for the user in the user_values table.