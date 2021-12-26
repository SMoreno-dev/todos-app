//Imports
const server = require("../server.js");
const {
  generateAccessToken,
  generateExpiredToken,
} = require("../utils/jsonwebtoken");
const code = require("../constants/http-status");
const message = require("../constants/default-constants");
const {
  CREATED_TODO,
  BAD_CREATE_TODO_REQUEST,
} = require("../constants/todo-constants");
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
  METHOD: "POST",
  PATH: "/todos",
};

//Body
const returnBody = (res) => res.body.body;

const goodRequest = {
  title: "New TODO",
  content: "TODO: Check if good request is working",
  userId: 1,
};

//Request missing data
const badRequest = {
  title: "New TODO",
};

describe(`${ENDPOINT.METHOD} ${ENDPOINT.PATH}`, () => {
  describe("Successful Response", () => {
    it("POST a new TODO", (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(goodRequest)
        .end((err, res) => {
          const body = returnBody(res);
          assert.isNull(err);
          assert.equal(res.status, code.CREATED);
          assert.equal(res.body.message, CREATED_TODO);
          assert.property(body, "id");
          assert.property(body, "title");
          assert.property(body, "content");
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
        .post(ENDPOINT.PATH)
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
        .post(ENDPOINT.PATH)
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
        .post(ENDPOINT.PATH)
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
        .post(ENDPOINT.PATH)
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
        .post(ENDPOINT.PATH)
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(badRequest)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.BAD_REQUEST);
          assert.equal(res.body.message, BAD_CREATE_TODO_REQUEST);

          done();
        });
    });
  });
});
