"use strict";

var jwt = require("jsonwebtoken");
var configuration = require("./configuration");

function TokenMachine() {

  this.giveToken = function () {
    return jwt.sign({}, secret(), defaultOptions());
  };

  function secret() {
    return configuration.jwtSecret;
  }

  function defaultOptions() {
    return {
      algorithm: "HS256",
      issuer: "xdcc:sessions",
      audience: ["xdcc:api", "xdcc:app"],
      expiresInSeconds: 604800
    };
  }
}

module.exports = TokenMachine;