"use strict";

module.exports = function (grunt) {
  grunt.registerTask("disableLogs", function () {
    process.env.XDCC_SESSIONS_LOG_LEVEL = "OFF";
  });
};