const chai = require("chai");
const chaiHttp = require("chai-http");
const server = "https://2oo4cepod3.execute-api.ap-southeast-2.amazonaws.com/";
const should = chai.should();

chai.use(chaiHttp);

describe("API Tests", () => {
  it("should create a new record with POST", (done) => {
    chai
      .request(server)
      .post("/")
      .send({ name: "Sample Record", email: "test@test.com" })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        done();
      });
  });

  it("should retrieve all records with GET", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
});
