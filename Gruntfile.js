"use strict";

module.exports = function (grunt) {
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  var config = {
    pkg: grunt.file.readJSON("package.json")
  };

  grunt.util._.extend(config, loadConfig("./tasks/options/"));
  grunt.initConfig(config);

  grunt.loadTasks("tasks");

  grunt.registerTask("test", ["jshint", "mochaTest:console"]);
  grunt.registerTask("cover", ["istanbul"]);
  grunt.registerTask("check", ["test", "cover"]);
  grunt.registerTask("default", ["jshint", "mochaTest:console", "watch"]);

  function loadConfig(path) {
    var glob = require("glob");
    var object = {};
    var key;

    glob.sync('*', {cwd: path}).forEach(function(option) {
      key = option.replace(/\.js$/,'');
      object[key] = require(path + option);
    });

    return object;
  }
};