"use strict";

var util = require("util");

function ServerError(message, code) {
  Error.call(this);

  this.message = message || "Server error";
  this.code = code || 500;
}

util.inherits(ServerError, Error);

module.exports = ServerError;