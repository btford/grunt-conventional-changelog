'use strict';
var changelog = require('conventional-changelog');

module.exports = function(grunt) {
  var DESC = 'Generate a changelog from git metadata';
  grunt.registerMultiTask('changelog', DESC, function() {

    var done = this.async();

    var options = this.options({
      dest: 'CHANGELOG.md'
    });

    // grunt-conventional-changelog options -> conventional-changelog options
    options.file = options.file || options.dest;
    options.log = grunt.log.ok.bind(grunt);
    options.warn = grunt.log.writeln.bind(grunt, '[warn]'.yellow);

    changelog(options, function(err, log) {
      if (err) {
        return grunt.fatal('Failed to generate changelog.', err);
      }

      if (options.file) {
        grunt.file.write(options.file, log);
      } else {
        grunt.log.writeln(log);
      }

      done();
    });
  });
};
