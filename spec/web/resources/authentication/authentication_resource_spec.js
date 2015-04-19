"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The authentication resource", function () {
  var resource;
  var commandBus;
  var crypto;

  beforeEach(function () {
    commandBus = {
      promisePropagation: sinon.stub().returns({
        then: function (callback) {
          return callback({_id: "1", login: "joe", password: "joe_password"});
        }
      })
    };
    crypto = {
      promiseToCompare: sinon.stub()
    };
    var dependencies = {
      commandBus: commandBus,
      crypto: crypto
    };
    var AuthenticationResource = require("../../../../src/web/resources/authentication/authentication_resource");
    resource = new AuthenticationResource(dependencies);
  });

  it("must be defined", function () {
    expect(resource).to.be.defined;
  });

  it("sends the find user command on the command bus and responds with some data", function () {
    crypto.promiseToCompare.returns({
      then: function (callback) { return callback(true); }
    });
    var request = {body: {login: "joe", "password": "joe_password"}};
    var response = {send: sinon.spy()};

    resource.promiseToAuthenticate(request, response);

    expect(commandBus.promisePropagation).to.have.been.calledWith("COMMAND_FIND_USER");
    expect(response.send).to.have.been.called;
  });

  it("sends back an error code when the authentication is not valid", function () {
    crypto.promiseToCompare.returns({
      then: function (callback) { return callback(false); }
    });
    var request = {body: {login: "joe", "password": "shhh"}};
    var response = {send: sinon.spy()};
    response.status = sinon.stub().returns(response);

    resource.promiseToAuthenticate(request, response);

    expect(response.status).to.have.been.calledWith(400);
    expect(response.send).to.have.been.calledWith({errors: [{message: "INVALID_LOGIN_OR_PASSWORD"}]});
  });
});