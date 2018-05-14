const lib = require("./lib");
const db = require("./db");
const mail = require("./mail");

//These are unit tests of the functions in lib.js.

describe("absolute", () => {
  it("should return a positive number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1); //toBe() is just one of many different "matcher" functions
  });

  it("should return a positive number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return 0 if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Brian");
    expect(result).toBe("Welcome Brian");
  });

  //The above test works but it is a little too specific. A better way to test strings is to match a regular expression.
  it("should return the greeting message", () => {
    const result = lib.greet("Brian");
    expect(result).toMatch(/Brian/);
  });
});

describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();
    expect(result).toEqual(expect.arrayContaining(["AUD", "USD", "EUR"]));
  });
  //the above test is a fancy way of testing arrays. It says that the
  //result should be an array that contains the elements listed but that
  //they can be in any order
});

describe("getProduct", () => {
  it("should return product with given id", () => {
    const result = lib.getProduct(1);
    expect(result).toEqual({ id: 1, price: 10 });
  });
  //the below tests will check that the returned object at least
  //contains the correct id. It can also contain all sorts of
  //other properties and methods, but it must contain the correct
  //id.
  it("should return product with given id", () => {
    const result = lib.getProduct(1);
    expect(result).toMatchObject({ id: 1 });
  });
  it("should return product with given id", () => {
    const result = lib.getProduct(1);
    expect(result).toHaveProperty("id", 1);
  });
});

describe("registerUser", () => {
  //checks for falsy username be seeing if it throws an expection (error)
  it("should throw if username is falsy", () => {
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach(el => {
      expect(() => lib.registerUser(el)).toThrow();
    });
  });
  //checks that a new user is created with a time.
  // You can't verify the exact time because there
  // is a descrepancy between when the new time object
  // is created and when the test occurs.
  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("mosh");
    expect(result).toMatchObject({ username: "mosh" });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("applyDiscount", () => {
  it("should apply 10% discount", () => {
    db.getCustomerSync = function(customerId) {
      return { id: customerId, points: 20 };
    };

    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

// describe("notifyCustomer", () => {
//     it("should notify customer through email", () => {
//         db.getCustomerSync = function (){
//             return {email: "a"}
//         }
//         let mailSend = false
//         mail.send = function(){
//             mailSent = true
//         }

//         const order = {customerId: 1}
//         lib.notifyCustomer(order)
//         expect(mailSent).toBe(true)
//     })
// })

//the above approach is one way to mock
//a better way is to use the jest.fn() function
describe("notifyCustomer", () => {
  it("should notify customer through email", () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled();
  });
});
