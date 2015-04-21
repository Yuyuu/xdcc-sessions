"use strict";

function FakeApplication() {
  this.handlers = [];

  this.use = function (handler) {
    this.handlers.push(handler);
  };
}

module.exports = FakeApplication;