"use strict";

var _ = require("lodash");
var crypto = new (require("../../utils/crypto"))();

var AuthenticationResource = require("./authentication/authentication_resource");

function Resources(dependencies) {
  this.authenticationResource = new AuthenticationResource(_.extend({crypto: crypto}, dependencies));
}

module.exports = Resources;