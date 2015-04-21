"use strict";

var FakeApplication = require("../test/fake_application");
var FakeResponse = require("../test/fake_response");
var UserNotFoundError = require("../../src/warehouses/errors/user_not_found_error");
var ClientError = require("../../src/web/errors/client_error");
var expect = require("chai").use(require("sinon-chai")).expect;

describe("The error handler", function () {
  var app;
  var response;
  var handler;

  beforeEach(function () {
    app = new FakeApplication();
    response = new FakeResponse();
    var ErrorHandler = require("../../src/web/error_handler");
    handler = new ErrorHandler();
    handler.configure(app);
  });

  it("must be defined", function () {
    expect(handler).to.be.defined;
  });

  it("configures the app with an error handler", function () {
    expect(app.handlers).to.have.length(1);
  });

  it("sends back an internal server error by default", function () {
    var error = new Error("error");

    app.handlers[0](error, null, response);

    expect(response.status).to.equal(500);
    expect(response.argumentsSent).to.deep.equal([{errors: [{message: "error"}]}]);
  });

  it("sends back a bad request if the user is not found", function () {
    var error = new UserNotFoundError("bob");

    app.handlers[0](error, null, response);

    expect(response.status).to.equal(400);
    expect(response.argumentsSent).to.deep.equal([{errors: [{message: "INVALID_LOGIN_OR_PASSWORD"}]}]);
  });

  it("preserves the error status if specified", function () {
    var error = new ClientError("unauthorized", 401);

    app.handlers[0](error, null, response);

    expect(response.status).to.equal(401);
    expect(response.argumentsSent).to.deep.equal([{errors: [{message: "unauthorized"}]}]);
  });

  it("provides a default error message if none is specified", function () {
    var error = new Error();

    app.handlers[0](error, null, response);

    expect(response.status).to.equal(500);
    expect(response.argumentsSent).to.deep.equal([{errors: [{message: "Server error"}]}]);
  });
});