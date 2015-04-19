"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;

describe("The crypto helper", function () {
  var crypto;

  beforeEach(function () {
    var Crypto = require("../../src/utils/crypto");
    crypto = new Crypto();
  });

  it("compares two passwords asynchronously", function () {
    var password = "shhh";

    crypto.promiseToEncrypt(password)
      .then(function (encryptedPassword) {
        return crypto.promiseToCompare(password, encryptedPassword);
      })
      .then(function (isIdentical) {
        expect(isIdentical).to.be.true;
      });
  });

  it("rejects with an error if anything wrong happens during the comparison", function () {
    crypto.promiseToEncrypt("shhh")
      .then(function (encryptedPassword) {
        return crypto.promiseToCompare(undefined, encryptedPassword);
      })
      .catch(function (error) {
        expect(error).to.be.defined;
      });
  });
});