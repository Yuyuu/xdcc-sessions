"use strict";

var spawnSync = require("child_process").spawnSync;

module.exports = function (grunt) {
  var binDir = "node_modules/.bin";

  grunt.registerTask("istanbul", function () {
    spawnSync(
      binDir + "/istanbul",
      ["cover", binDir + "/_mocha", "--", "--reporter", "dot", "--recursive", "spec"],
      {stdio: "inherit", encoding: "UTF-8"}
    );
  });
};