"use strict";

var log4js = require("log4js");
var path = require("path");
var configuration = require("./configuration");

log4js.configure({
  appenders: [
    {
      type: "console",
      layout: {type: "pattern", pattern: "%[[%d] [%p] [%c]%] | %m"}
    }
  ],
  levels: {"[all]": configuration.logLevel}
});

module.exports = function (filename) {
  return log4js.getLogger(path.basename(filename));
};