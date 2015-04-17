"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The request validator", function () {
  var validator;

  beforeEach(function () {
    var RequestValidator = require("../../../src/web/resources/request_validator");
    validator = new RequestValidator();
  });

  it("must be defined", function () {
    expect(validator).to.be.defined;
  });

  it("validates a request which is valid and calls the associated function", function () {
    var validationObject = {
      schema: {field: {type: "string", required: true, message: "field is required"}},
      request: {body: {field: "the content of the field"}},
      response: {},
      promise: sinon.stub().returns("promiseResult")
    };

    expect(validator.promiseIfRequestIsValid(validationObject)).to.equal("promiseResult");
  });

  it("rejects an invalid request", function () {
    var validationObject = {
      schema: {field: {type: "string", required: true, message: "field is required"}},
      request: {body: {}},
      errorMessage: "error"
    };

    validator.promiseIfRequestIsValid(validationObject).catch(function (error) {
      expect(error.message).to.equal("error: field is required");
    });
  });
});