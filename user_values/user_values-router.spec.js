const request = require("supertest");

const server = require("../api/server");

const dB = require('../database/dbConfig');

// ****************************************************
// Constants & Variables for tests
// ****************************************************
const uName = "userValueTable_tests"; 
const pasWd = "wsx";
let testId;
let testToken;
let testUserValueId;
const postData = [  //Note that the user_id has to be set after obtained from database
  { 
    user_id: 0, 
    value_name: "valueA", 
    color: "yellowA", 
    importance_description: "A is first letter"
  },
  { 
    user_id: 0, 
    value_name: "valueB", 
    color: "yellowB", 
    importance_description: "B is second letter"
  },        
  { 
    user_id: 0, 
    value_name: "valueC", 
    color: "yellowC", 
    importance_description: "C is third letter"
  }
];

// ****************************************************
// Helper functions
// ****************************************************
function setUserId(){
  for(let i=0; i<3; i++) {
    postData[i].user_id = testId;
  }
}

function cloneData() {
  const temp = [];
  for(let i=0; i<3; i++) {
    temp[i] = {...postData[i]};
  }
  return temp;
}


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
        testId = res.body.id;
        testToken = res.body.token;
        setUserId();
        // console.log(`id is ${testId} & token is ${testToken}`);
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
//         testId = res.body.user_id;
//         testToken = res.body.token;
//         setUserId();
//         // console.log(`id is ${testId} & token is ${testToken}`);
//       })
//   })
// })


// ****************************************************
// 1 - userValues table: POST /api/usrValues 
// Error with bad token
// ****************************************************
describe('1 - userValues table: POST /api/usrValues ',()=>{
  it("Error with bad token",()=>{
    return request(server)
      .post("/api/usrValues")
      .set('Authorization', `noGoodToken`)
      .send([{},{},{}])
      .then(res=>{
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Invalid Token");
      })
  })
})


// ****************************************************
// 2 - userValues table: POST /api/usrValues 
// Error when body is an array of lenght not equal to 3
// ****************************************************
describe('2 - userValues table: POST /api/usrValues ',()=>{
  it("Error when body is an array of lenght not equal to 3",()=>{
    return request(server)
      .post("/api/usrValues")
      .set('Authorization', `${testToken}`)
      .send([{},{}])
      .then(res=>{
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("the body must be an array of 3 objects only");
      })
  })
})


// ****************************************************
// 3 - userValues table: POST /api/usrValues
// Error if user_id is not in each of the objects of array body
// ****************************************************
for(let index=0; index<3; index++) {
  describe(`3 - userValues table: POST /api/usrValues`,()=>{
    it(`Error if user_id not in object ${index} of array body`,()=>{

      let reqData = cloneData();
      delete reqData[index].user_id;
      reqData[index].NOTuser_id = 1234;

      // console.log("Index is:",index," and reqData is:",reqData);
      // console.log("postdata is:",postData);

      return request(server)
        .post("/api/usrValues")
        .set('Authorization', `${testToken}`)
        .send(reqData)
        .then(res=>{
          expect(res.status).toBe(400);
          expect(res.body.message).toBe("missing field user_id in one or more objects in request body array");
        })
    })
  })
}


// ****************************************************
// 4 - userValues table: POST /api/usrValues 
// Error if value_name is not in each of the objects of array body
// ****************************************************
for(let index=0; index<3; index++) {
  describe(`4 - userValues table: POST /api/usrValues`,()=>{
    it(`Error if value_name not in object ${index} of array body`,()=>{

      let reqData = cloneData();
      delete reqData[index].value_name;
      reqData[index].NOTvalue_name = "NOname";

      // console.log("Index is:",index," and reqData is:",reqData);
      // console.log("postdata is:",postData);

      return request(server)
        .post("/api/usrValues")
        .set('Authorization', `${testToken}`)
        .send(reqData)
        .then(res=>{
          expect(res.status).toBe(400);
          expect(res.body.message).toBe("missing field value_name in one or more objects in request body array");
        })
    })
  })
}


// ****************************************************
// 5 - userValues table: POST /api/usrValues 
// Error if color is not in each of the objects of array body
// ****************************************************
for(let index=0; index<3; index++) {
  describe(`5 - userValues table: POST /api/usrValues`,()=>{
    it(`Error if color not in object ${index} of array body`,()=>{

      let reqData = cloneData();
      delete reqData[index].color;
      reqData[index].NOTcolor = "NOcolor";

      // console.log("Index is:",index," and reqData is:",reqData);
      // console.log("postdata is:",postData);

      return request(server)
        .post("/api/usrValues")
        .set('Authorization', `${testToken}`)
        .send(reqData)
        .then(res=>{
          expect(res.status).toBe(400);
          expect(res.body.message).toBe("missing field color in one or more objects in request body array");
        })
    })
  })
}


// ****************************************************
// 6 - userValues table: POST /api/usrValues 
// Error if importance_description is not in each of the objects of array body
// ****************************************************
for(let index=0; index<3; index++) {
  describe(`6 - userValues table: POST /api/usrValues`,()=>{
    it(`Error if importance_description not in object ${index} of array body`,()=>{

      let reqData = cloneData();
      delete reqData[index].importance_description;
      reqData[index].NOTimportance_description = "NO";

      // console.log("Index is:",index," and reqData is:",reqData);
      // console.log("postdata is:",postData);

      return request(server)
        .post("/api/usrValues")
        .set('Authorization', `${testToken}`)
        .send(reqData)
        .then(res=>{
          expect(res.status).toBe(400);
          expect(res.body.message).toBe("missing field importance_description in one or more objects in request body array");
        })
    })
  })
}


// ****************************************************
// 7 - userValues table: POST /api/usrValues 
// Error if user_id in body object is not of logged in user
// ****************************************************
for(let index=0; index<3; index++) {
  describe(`7 - userValues table: POST /api/usrValues`,()=>{
    it(`Error if user_id in body object ${index} is not of logged in user`,()=>{

      let reqData = cloneData();
      reqData[index].user_id = 1234;

      // console.log("Index is:",index," and reqData is:",reqData);
      // console.log("postdata is:",postData);

      return request(server)
        .post("/api/usrValues")
        .set('Authorization', `${testToken}`)
        .send(reqData)
        .then(res=>{
          expect(res.status).toBe(400);
          expect(res.body.message).toBe(`You are loggged in with user_id ${testId} but accessing data of different user_id`);
        })
    })
  })
}


// ****************************************************
// 8 - userValues table: POST /api/usrValues 
// Successfully add record to uver_Values table
// ****************************************************
describe(`8 - userValues table: POST /api/usrValues`,()=>{
  it(`Successfully add record to uver_Values table`,()=>{
    return request(server)
      .post("/api/usrValues")
      .set('Authorization', `${testToken}`)
      .send(postData)
      .then(res=>{
        expect(res.status).toBe(201);
        expect(res.body.length).toBe(3);
        testUserValueId = res.body[0].id;
        // console.log("testUserValueId is",testUserValueId);
      })
  })
})


// ****************************************************
// 9 - userValues table: PUT /api/usrValues 
// Error with bad token
// ****************************************************
describe(`9 - userValues table: PUT /api/usrValues`,()=>{
  it(`Error with bad token`,()=>{
    return request(server)
      .put("/api/usrValues")
      .set('Authorization', `noGoodToken`)
      .send([{},{},{}])
      .then(res=>{
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Invalid Token");
      })
  })
})


// ****************************************************
// 10 - userValues table: PUT /api/usrValues 
// Error if value_name is not in the object body
// ****************************************************
describe(`10 - userValues table: PUT /api/usrValues`,()=>{
  it(`Error if user_id is not in the object body`,()=>{

    let reqData = cloneData()[0];
    delete reqData.value_name;
    reqData.NOTvalue_name = "NOT THERE";
    reqData.id = testUserValueId;
    // console.log("reqData is:",reqData);

    return request(server)
      .put("/api/usrValues")
      .set('Authorization', `${testToken}`)
      .send(reqData)
      .then(res=>{
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("missing field value_name in request body");
      })
  })
})






