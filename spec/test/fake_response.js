"use strict";

var _ = require("lodash");

function FakeResponse() {
  this.argumentsSent = null;
  this.status = null;

  this.send = function () {
    this.argumentsSent = _.toArray(arguments);
    return this;
  };

  this.status = function (statut) {
    this.status = statut;
    return this;
  };
}

module.exports = FakeResponse;