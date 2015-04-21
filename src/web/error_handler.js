"use strict";

var ServerError = require("./errors/server_error");
var ClientError = require("./errors/client_error");
var UserNotFoundError = require("../warehouses/errors/user_not_found_error");
var logger = require("../utils/log")(__filename);

function ErrorHandler() {

  this.configure = function (application) {
    application.use(function (error, request, response, next) {
      logError(error);
      var webError = convertToWebError(error);
      response.status(webError.code).send({errors: [{message: webError.message}]});
    });
  };

  function logError(error) {
    logger.error("Unhandled error:", error.stack || error.message);
  }

  function convertToWebError(error) {
    if (error instanceof ServerError || error instanceof ClientError) {
      return error;
    }
    if (error instanceof UserNotFoundError) {
      return new ClientError("INVALID_LOGIN_OR_PASSWORD", 400);
    }
    return new ServerError(error.message);
  }
}

module.exports = ErrorHandler;