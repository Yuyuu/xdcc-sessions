"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var Router = require("./router");
var ErrorHandler = require("./error_handler");
var configuration = require("../utils/configuration");
var logger = require("../utils/log")(__filename);
var log4js = require("log4js");

function Server(dependencies) {
  var app = express();

  app.use(log4js.connectLogger(logger, {level: "auto"}));
  app.use(bodyParser.json());

  new Router(dependencies).configure(app);
  new ErrorHandler().configure(app);

  this.start = function () {
    app.listen(port(), function () {
      logger.info("Started xdcc-sessions server on port", this.address().port);
    });
  };

  function port() {
    return configuration.port;
  }
}

module.exports = Server;