const bcrypt = require("bcrypt");

function isValidPassword(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = { isValidPassword };
