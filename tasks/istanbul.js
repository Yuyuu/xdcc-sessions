"use strict";

var spawnSync = require("child_process").spawnSync;

module.exports = function (grunt) {
  var binDir = "node_modules/.bin";

  var excludedPatterns = [
    "app.js",
    "spec/**",
    "src/web/server.js",
    "src/web/router.js",
    "src/infrastructure/mongo/database.js"
  ];

  grunt.registerTask("istanbul", function () {
    spawnSync(
      binDir + "/istanbul",
      ["cover", "-x", excludedPatterns.join(" "), binDir + "/_mocha", "--", "--reporter", "spec", "--recursive", "spec"],
      {stdio: "inherit", encoding: "UTF-8"}
    );
  });
};