module.exports.getFirst = function() {
  return "Brian";
};

module.exports.getLast = function() {
  return "Haller";
};

module.exports.getFull = function(callbackFirstName, callbackLastName) {
  const first = callbackFirstName();
  const last = callbackLastName();
  return `${first} ${last}`;
};
