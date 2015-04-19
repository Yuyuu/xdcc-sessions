"use strict";

var CommandTypes = require("../../../commands/command_types");
var TokenMachine = require("../../../utils/token_machine");
var requestValidator = new(require("../request_validator"))();

function AuthenticationResource(dependencies) {
  var tokenMachine = new TokenMachine();

  this.promiseToAuthenticate = function (request, response) {
    return requestValidator.promiseIfRequestIsValid({
      schema: authenticationSchema(),
      request: request,
      response: response,
      errorMessage: "Request is invalid",
      promise: promiseValidAuthenticationRequest
    });
  };

  function promiseValidAuthenticationRequest(request, response) {
    var user;
    var promise = dependencies.commandBus.promisePropagation(CommandTypes.findUser, request.body);
    return promise
      .then(function (foundUser) {
        user = foundUser;
        return dependencies.crypto.promiseToCompare(request.body.password, foundUser.password);
      })
      .then(function (authenticationIsSuccessful) {
        if (!authenticationIsSuccessful) {
          return response.status(400).send({errors: [{message: "INVALID_LOGIN_OR_PASSWORD"}]});
        }

        var signedToken = tokenMachine.giveToken();
        response.send({token: signedToken, user: {id: user._id, login: user.login, role: "member"}});
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