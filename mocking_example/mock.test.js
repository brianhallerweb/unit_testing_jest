const p = require("./mock");

describe("getFirst", () => {
  it("should be a function", () => {
    expect(typeof p.getFirst).toBe("function");
  });

  it("should return Brian", () => {
    expect(p.getFirst()).toBe("Brian");
  });
});

describe("getLast", () => {
  it("should be a function", () => {
    expect(typeof p.getFirst).toBe("function");
  });

  it("should return Haller", () => {
    expect(p.getLast()).toBe("Haller");
  });
});

describe("getFull", () => {
  it("should be a function", () => {
    expect(typeof p.getFull).toBe("function");
  });

  it("should return 'Brian Haller' ", () => {
    expect(p.getFull(p.getFirst, p.getLast)).toBe("Brian Haller");
  });

  it("should return getFirst() + ' ' + getLast()", () => {
    p.getFirst = jest.fn().mockReturnValue("John");
    p.getLast = jest.fn().mockReturnValue("Doe");
    expect(p.getFull(p.getFirst, p.getLast)).toBe("John Doe");
  });
});
