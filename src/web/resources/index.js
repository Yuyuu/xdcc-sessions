"use strict";

function Resources(dependencies) {
  this.authenticationResource = new(require("./authentication/authentication_resource"))(dependencies);
}

module.exports = Resources;