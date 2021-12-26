//Imports
const server = require("../server.js");
const {
  generateAccessToken,
  generateExpiredToken,
} = require("../utils/jsonwebtoken");
const code = require("../constants/http-status");
const message = require("../constants/default-constants");
const {
  BAD_UPDATE_USER_REQUEST,
  UPDATED_USER,
} = require("../constants/user-constants");
const chai = require("chai");
const chaiHttp = require("chai-http");

//Chai
const assert = chai.assert;
chai.use(chaiHttp);

//TOKEN
const TOKEN = generateAccessToken({ id: 1 });
const EXPIRED_TOKEN = generateExpiredToken();

//Endpoint method and path
const ENDPOINT = {
  METHOD: "PATCH",
  PATH: "/users",
};

//Good request
const goodRequest = {
  email: "updatedEmail@gmail.com",
};

//Bad Request, no valid fields
const badRequest = {
  name: "This field does not exist on the users model",
};

//Body
const returnBody = (res) => res.body.body;

describe(`${ENDPOINT.METHOD} ${ENDPOINT.PATH}`, () => {
  describe("Successful response", () => {
    it("PATCH an user by id", (done) => {
      chai
        .request(server)
        .patch(`${ENDPOINT.PATH}/3`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(goodRequest)
        .end((err, res) => {
          const body = returnBody(res);
          assert.isNull(err);
          assert.equal(res.status, code.OK);
          assert.equal(res.body.message, UPDATED_USER(3));
          assert.property(body, "id");
          assert.property(body, "email");
          assert.property(body, "createdAt");
          assert.property(body, "updatedAt");

          done();
        });
    });
  });

  describe("Authorization", () => {
    it("token (undefined)", (done) => {
      chai
        .request(server)
        .patch(`${ENDPOINT.PATH}/3`)
        .send(goodRequest)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.FORBIDDEN);
          assert.equal(res.body.message, message.FORBIDDEN);

          done();
        });
    });

    it("token (expired)", (done) => {
      chai
        .request(server)
        .patch(`${ENDPOINT.PATH}/3`)
        .set("Authorization", `Bearer ${EXPIRED_TOKEN}`)
        .send(goodRequest)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.FORBIDDEN);
          assert.equal(res.body.message, message.FORBIDDEN);

          done();
        });
    });

    it("token (empty)", (done) => {
      chai
        .request(server)
        .patch(`${ENDPOINT.PATH}/3`)
        .set("Authorization", `Bearer `)
        .send(goodRequest)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.FORBIDDEN);
          assert.equal(res.body.message, message.FORBIDDEN);

          done();
        });
    });

    it("token (invalid)", (done) => {
      chai
        .request(server)
        .patch(`${ENDPOINT.PATH}/3`)
        .set("Authorization", "Bearer test")
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.FORBIDDEN);
          assert.equal(res.body.message, message.FORBIDDEN);

          done();
        });
    });
  });

  describe("Middleware Validation", () => {
    it("Missing fields in request body", (done) => {
      chai
        .request(server)
        .patch(`${ENDPOINT.PATH}/3`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(badRequest)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.BAD_REQUEST);
          assert.equal(res.body.message, BAD_UPDATE_USER_REQUEST);

          done();
        });
    });
  });
});
