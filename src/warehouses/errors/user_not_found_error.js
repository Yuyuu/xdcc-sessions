"use strict";

var util = require("util");

function UserNotFoundError(login) {
  Error.call(this);

  this.message = "No existing user for login " + login;
}

util.inherits(UserNotFoundError, Error);

module.exports = UserNotFoundError;