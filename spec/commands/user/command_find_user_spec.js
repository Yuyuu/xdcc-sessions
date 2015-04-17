"use strict";

var _ = require("lodash");
var expect = require("chai").use(require("sinon-chai")).expect;

describe("The find user command", function () {
  var command;
  var userWarehouse;

  beforeEach(function () {
    userWarehouse = new FakeWarehouse();
    var CommandFindUser = require("../../../src/commands/user/command_find_user");
    command = new CommandFindUser({
      warehouses: {userWarehouse: userWarehouse}
    });
  });

  it("must be defined", function () {
    expect(command).to.be.defined;
  });

  it("returns the user", function () {
    var users = [{id: "1", login: "joe"}, {id: "2", login: "bob"}];
    userWarehouse.with(users);

    expect(command.promiseExecution({login: "bob"})).to.deep.equal({id: "2", login: "bob"});
  });

  function FakeWarehouse() {
    var storage = [];

    this.with = function (entitiesToStore) {
      storage = _.union(storage, entitiesToStore);
    };

    this.promiseToFindForLogin = function (login) {
      return _.find(storage, function (user) {
        return user.login === login;
      });
    };
  }
});