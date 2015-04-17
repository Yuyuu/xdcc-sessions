"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The authentication resource", function () {
  var resource;
  var commandBus;

  beforeEach(function () {
    commandBus = {
      promisePropagation: sinon.stub().returns({
        then: function (callback) {
          callback();
        }
      })
    };
    var dependencies = {
      commandBus: commandBus
    };
    var AuthenticationResource = require("../../../../src/web/resources/authentication/authentication_resource");
    resource = new AuthenticationResource(dependencies);
  });

  it("must be defined", function () {
    expect(resource).to.be.defined;
  });

  it("sends the authenticate command on the command bus and responds with some data", function () {
    var request = {body: {login: "joe", "password": "joe_password"}};
    var response = {send: sinon.spy()};

    resource.postPromise(request, response);

    expect(commandBus.promisePropagation).to.have.been.calledWith("COMMAND_AUTHENTICATE");
    expect(response.send).to.have.been.called;
  });
});