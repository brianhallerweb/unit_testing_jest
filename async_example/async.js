function asyncSquare(num, callback) {
  setTimeout(() => {
    const square = num * num;
    callback(square);
  }, 0);
}

module.exports = {
  asyncSquare
};
