"use strict";

var configure = require("12factor-config");

var configuration = configure({
  logLevel: {
    env: "XDCC_SESSIONS_LOG_LEVEL",
    type: "string",
    default: "info",
    values: ["debug", "info", "error"]
  },
  port: {
    env: "PORT",
    type: "integer",
    default: 8087
  }
});

module.exports = configuration;