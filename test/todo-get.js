//Imports
const server = require("../server.js");
const code = require("../constants/http-status");
const { GOT_TODO } = require("../constants/todo-constants");
const chai = require("chai");
const chaiHttp = require("chai-http");

//Chai
const assert = chai.assert;
chai.use(chaiHttp);

//Endpoint method and path
const ENDPOINT = {
  METHOD: "GET",
  PATH: "/todos",
};

describe(`${ENDPOINT.METHOD} ${ENDPOINT.PATH}`, () => {
  describe("Successful response", () => {
    it("GETs all todos", (done) => {
      chai
        .request(server)
        .get(`${ENDPOINT.PATH}`)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.OK);
          assert.equal(res.body.message, GOT_TODO);

          done();
        });
    });
  });
});
