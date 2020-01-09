const request = require("supertest");

const server = require("../api/server");

const dB = require('../database/dbConfig');

// ****************************************************
// Constants & Variables for tests
// ****************************************************
const uName = "valuesTable_tests"; 
const pasWd = "qaz";
let testToken;


// ****************************************************
// Create a user for subsequent tests
// Use POST /api/auth/register
// Check that a user is registered properly and a token is received
// ****************************************************
describe('POST /api/auth/register',()=>{

  beforeEach(async ()=>{
    await dB('projects').truncate();
    await dB('user_values').truncate();
    await dB('users').truncate();
  })

  it("Should register and send back token and user_id",()=>{
    return request(server)
      .post("/api/auth/register")
      .send({username:uName,password:pasWd})
      .then(res=>{
        expect(res.status).toBe(201);
        expect(res.body.username).toBe(uName);
        expect((res.body.token)).not.toBe(undefined);
        expect((res.body.id)).not.toBe(undefined);  
        testToken = res.body.token;
      })
  })
})


// ****************************************************
// This login check is just used for debugging
// Comment out for final code
// ****************************************************
// describe('login to get token',()=>{
//   it("Should get a token for further tests",()=>{
//     return request(server)
//       .post("/api/auth/login")
//       .send({username:uName,password:pasWd})
//       .then(res=>{
//         expect(res.status).toBe(200);
//         testToken = res.body.token;
//       })
//   })
// })


// ****************************************************
// 1st test values table: GET /api/values
// Check that a user can receive values properly from values table
// ****************************************************
describe('1st test values table: GET /api/values',()=>{
  it("Should receive values from values table",()=>{
    return request(server)
      .get("/api/values")
      .set('Authorization', `${testToken}`)
      .then(res=>{
        expect(res.status).toBe(200);
        const body = res.body;
        expect(body[0].id).toBe(1);
        expect(body[0].name).toBe("Acceptance");
        expect(body[221].id).toBe(222);
        expect(body[221].name).toBe("Wonder");
      })
  })
})


// ****************************************************
// 2nd test values table: GET /api/values
// Check that a user cannot get data with bad token
// ****************************************************
describe('2nd test values table: GET /api/values',()=>{
  it("Should get a message about invalid token",()=>{
    return request(server)
      .get("/api/values")
      .set('Authorization', `noGoodToken`)
      .then(res=>{
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Invalid Token");
      })
  })
})

