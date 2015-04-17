"use strict";

var _ = require("lodash");
var expect = require("chai").use(require("sinon-chai")).expect;

describe("The command bus", function () {
  var bus;

  beforeEach(function () {
    var CommandBus = require("../../src/utils/command_bus");
    bus = new CommandBus();
  });

  it("must be defined", function () {
    expect(bus).to.be.defined;
  });

  it("propagates a command to its subscriber", function () {
    bus.subscribe("follow the rules", fakeCommand());

    var result = bus.promisePropagation("follow the rules");

    expect(result).to.equal("Command executed");
  });

  it("returns an error if there is no subscriber to the command", function () {
    bus.promisePropagation("nope").catch(function (error) {
      expect(error.message).equal("There is no subscriber for command nope");
    });
  });

  it("propagates the command with the given data", function () {
    bus.subscribe("follow the rules", fakeCommand());

    var result = bus.promisePropagation("follow the rules", "some", "data");

    expect(result).to.equal("Command executed with " + ["some", "data"]);
  });

  it("only accepts one subscriber to a command", function () {
    bus.subscribe("follow the rules", fakeCommand());

    expect(bus.subscribe.bind(bus, "follow the rules", {})).to.throw(
      Error,
      "There is already a subscriber for the command follow the rules"
    );
  });

  function fakeCommand() {
    return {
      promiseExecution: function () {
        var statement = "Command executed";
        if (arguments.length > 0) {
          statement += " with " + _.toArray(arguments);
        }
        return statement;
      }
    };
  }
});