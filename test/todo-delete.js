//Imports
const server = require("../server.js");
const {
  generateAccessToken,
  generateExpiredToken,
} = require("../utils/jsonwebtoken");
const code = require("../constants/http-status");
const message = require("../constants/default-constants");
const { DELETED_TODO } = require("../constants/todo-constants");
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
  METHOD: "DELETE",
  PATH: "/todos",
};

describe(`${ENDPOINT.METHOD} ${ENDPOINT.PATH}`, () => {
  describe("Successful response", () => {
    it("DELETE a TODO by id", (done) => {
      chai
        .request(server)
        .delete(`${ENDPOINT.PATH}/1`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.OK);
          assert.equal(res.body.message, DELETED_TODO(1));

          done();
        });
    });
  });

  describe("Authorization", () => {
    it("token (undefined)", (done) => {
      chai
        .request(server)
        .delete(`${ENDPOINT.PATH}/10`)
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
        .delete(`${ENDPOINT.PATH}/10`)
        .set("Authorization", `Bearer ${EXPIRED_TOKEN}`)
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
        .delete(`${ENDPOINT.PATH}/10`)
        .set("Authorization", `Bearer `)
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
        .delete(`${ENDPOINT.PATH}/10`)
        .set("Authorization", "Bearer test")
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.FORBIDDEN);
          assert.equal(res.body.message, message.FORBIDDEN);

          done();
        });
    });
  });
});
