"use strict";

var bcrypt = require("bcrypt");
var Bluebird = require("bluebird");

function Crypto() {
  var encryptAsync = Bluebird.promisify(bcrypt.hash);
  var compareAsync = Bluebird.promisify(bcrypt.compare);

  this.promiseToEncrypt = function (readablePassword) {
    return encryptAsync(readablePassword, 4);
  };

  this.promiseToCompare = function (password, hash) {
    return compareAsync(password, hash);
  };
}

module.exports = Crypto;