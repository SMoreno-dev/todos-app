require("dotenv").config();

//Imports
const server = require("../server.js");
const code = require("../constants/http-status");
const message = require("../constants/default-constants");
const {
  CREATED_USER,
  BAD_CREATE_USER_REQUEST,
  LOGGED_IN,
  BAD_CREDENTIALS,
} = require("../constants/user-constants");
const chai = require("chai");
const chaiHttp = require("chai-http");

//Chai
const assert = chai.assert;
chai.use(chaiHttp);

//Endpoint method and path
const ENDPOINT = {
  METHOD: "POST",
  PATH: "/users",
};

//Good requests
const goodRegisterRequest = {
  email: "newUser@gmail.com",
  password: process.env.MOCK_USER_PASSWORD,
};

const goodLoginRequest = {
  email: "user1@gmail.com",
  password: `${process.env.MOCK_USER_PASSWORD + 1}`,
};

//Bad requests
const badRegisterRequest = {
  email: "newUser@gmail.com",
};

const badLoginRequest = {
  email: "user1@gmail.com",
  password: "clearlyTheWrongPassword",
};

describe(`${ENDPOINT.METHOD} ${ENDPOINT.PATH}`, (done) => {
  describe("POST a new user", () => {
    it("Successful response", (done) => {
      chai
        .request(server)
        .post(`${ENDPOINT.PATH}/register`)
        .send(goodRegisterRequest)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.CREATED);
          assert.equal(res.body.message, CREATED_USER);

          done();
        });
    });

    it("Middleware Validation", (done) => {
      chai
        .request(server)
        .post(`${ENDPOINT.PATH}/register`)
        .send(badRegisterRequest)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.BAD_REQUEST);
          assert.equal(res.body.message, BAD_CREATE_USER_REQUEST);

          done();
        });
    });
  });

  describe("Log in an user", () => {
    it("Successful response", (done) => {
      chai
        .request(server)
        .post(`${ENDPOINT.PATH}/login`)
        .send(goodLoginRequest)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.OK);
          assert.equal(res.body.message, LOGGED_IN);

          done();
        });
    });

    it("Bad credentials", (done) => {
      chai
        .request(server)
        .post(`${ENDPOINT.PATH}/login`)
        .send(badLoginRequest)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.UNAUTHORIZED);
          assert.equal(res.body.message, BAD_CREDENTIALS);

          done();
        });
    });
  });
});
