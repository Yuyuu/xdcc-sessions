"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The authentication warehouse", function () {
  var warehouse;
  var databaseConnector;

  beforeEach(function () {
    databaseConnector = {
      promiseToFindOne: sinon.stub()
    };
    var AuthenticationWarehouse = require("../../src/warehouses/authentication_warehouse");
    warehouse = new AuthenticationWarehouse(databaseConnector);
  });

  it("must be defined", function () {
    expect(warehouse).to.be.defined;
  });

  it("promises to find a user by its login", function () {
    var user = {login: "bob", password: "bobs_password"};
    databaseConnector.promiseToFindOne.withArgs("view_mongouser", {login: "bob"}).returns({
      then: function (callback) {return callback(user);}
    });

    expect(warehouse.promiseToFindForLogin("bob")).to.equal(user);
  });

  it("rejects if no user is found for the given login", function () {
    databaseConnector.promiseToFindOne.withArgs("view_mongouser", {login: "bob"}).returns({
      then: function (callback) {return callback(null);}
    });

    expect(warehouse.promiseToFindForLogin.bind(null, "bob")).to.throw(Error);
  });
});