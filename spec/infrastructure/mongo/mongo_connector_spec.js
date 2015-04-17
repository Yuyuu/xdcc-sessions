"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("The mongo connector", function () {
  var collection;
  var connector;

  beforeEach(function () {
    collection = {};
    var db = {
      collection: sinon.stub().withArgs("users").returns(collection)
    };
    var MongoConnector = require("../../../src/infrastructure/mongo/mongo_connector");
    connector = new MongoConnector(db);
  });

  it("must be defined", function () {
    expect(connector).to.be.defined;
  });

  it("rejects with an error if one occurred finding the one document", function () {
    collection.findOne = function (criteria, callback) {
      callback("this is an error", null);
    };

    connector.promiseToFindOne("users", {}).catch(function (error) {
      expect(error).to.equal("this is an error");
    });
  });

  it("sends the document when it is found", function () {
    collection.findOne = function (criteria, callback) {
      callback(null, {id: "1"});
    };

    connector.promiseToFindOne("users", {}).then(function (document) {
      expect(document.id).to.equal("1");
    });
  });
});