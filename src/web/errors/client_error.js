"use strict";

var util = require("util");

function ClientError(message, code) {
  Error.call(this);

  this.message = message || "Client error";
  this.code = code || 400;
}

util.inherits(ClientError, Error);

module.exports = ClientError;