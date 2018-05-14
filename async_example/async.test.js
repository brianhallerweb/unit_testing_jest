const a = require("./async");

//This test will not complete until done() runs.
test("asyncSquare", done => {
  a.asyncSquare(3, input => {
    expect(input).toBe(9);
    done();
  });
});
