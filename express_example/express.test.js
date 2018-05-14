const request = require("supertest");
const app = require("./express").app;

test("display hello world", done => {
  request(app)
    .get("/")
    .expect(200)
    .expect("hello world")
    .end(done);
});
