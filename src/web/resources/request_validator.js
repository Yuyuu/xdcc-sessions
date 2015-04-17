"use strict";

var _ = require("lodash");
var Bluebird = require("bluebird");
var schematize = require("validate");

function RequestValidator() {
  this.promiseIfRequestIsValid = function (validationObject) {
    var schema = schematize(validationObject.schema, {typecast: true});
    var errors = schema.validate(validationObject.request.body);

    if (!_.isEmpty(errors)) {
      return Bluebird.reject(new Error(validationObject.errorMessage + ": " + errors.join(", ")));
    }

    return validationObject.promise(validationObject.request, validationObject.response);
  };
}

module.exports = RequestValidator;