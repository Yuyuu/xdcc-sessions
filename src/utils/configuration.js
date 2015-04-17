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
  },
  databaseUrl: {
    env: "XDCC_SESSIONS_DB_URL",
    type: "string",
    default: "mongodb://localhost:27017/xdccapp"
  },
  databaseLogLevel: {
    env: "XDCC_SESSIONS_DB_LOG_LEVEL",
    type: "string",
    default: "info",
    values: ["debug", "info", "error"]
  }
});

module.exports = configuration;