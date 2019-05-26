var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("Get All Comment from an Organization",function(){

  // #1 should return all comment from an organization
  it("Should return all comment from organization",function(done){

    // calling home page api
    server
    .get("/api/v1/orgs/xendit/comments")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      res.body.error.should.equal(false);
      done();
    });
  });

  // #2 should return all member from an organization
  it("Should return all member from organization",function(done){

    // calling home page api
    server
    .get("/api/v1/orgs/xendit/members")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      res.body.error.should.equal(false);
      done();
    });
  });

});