"use strict";

var CommandTypes = require("../../../commands/command_types");
var requestValidator = new(require("../request_validator"))();

function AuthenticationResource(dependencies) {

  this.postPromise = function (request, response) {
    return requestValidator.promiseIfRequestIsValid({
      schema: authenticationSchema(),
      request: request,
      response: response,
      errorMessage: "Request is invalid",
      promise: promiseValidPost
    });
  };

  function promiseValidPost(request, response) {
    var promise = dependencies.commandBus.promisePropagation(CommandTypes.findUser, request.body);
    return promise.then(function (data) {
      response.send(data);
    });
  }
}

function authenticationSchema() {
  return {
    login: {type: "string", required: true, message: "login is required"},
    password: {type: "string", required: true, message: "password is required"}
  };
}

module.exports = AuthenticationResource;