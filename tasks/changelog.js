'use strict';
var changelog = require('conventional-changelog');
var spawn = require('child_process').spawn;

module.exports = function(grunt) {
  var DESC = 'Generate a changelog from git metadata';
  grunt.registerTask('changelog', DESC, function() {

    var done = this.async();

    var options = this.options({
      dest: 'CHANGELOG.md',
      prepend: true, // false to append
      editor: null, // 'sublime -w'
      github: null // deprecated
    });

    // grunt-conventional-changelog options -> conventional-changelog options
    options.file = options.file || options.dest;
    options.log = grunt.log.ok.bind(grunt);
    options.warn = grunt.log.writeln.bind(grunt, '[warn]'.yellow);
    options.repository = options.repository || options.github;

    // deprecated `options.github`
    if (options.github) {
      grunt.log.writeln('`changelog.options.github` is deprecated. Use `options.repository`. \nView the README at http://github.com/btford/grunt-conventional-changelog for more information.');
    }

    // deprecated `options.editor`
    if (options.editor) {
      grunt.log.writeln('`changelog.options.editor` is deprecated. Use `grunt-shell` or `grunt-spawn` instead. \nCheckout https://github.com/sindresorhus/grunt-shell or https://github.com/fir3pho3nixx/grunt-spawn for more information.');
    }

    changelog(options, function(err, log) {
      if (err) {
        return grunt.fatal('Failed to generate changelog.', err);
      }

      if (options.file) {
        grunt.file.write(options.file, log);
        if (options.editor) {
          var args = options.editor.split(/\s+/);
          var binary = args.shift();

          var proc = spawn(binary, args.concat(options.file), {
            stdio: 'inherit'
          });
          proc.on('error', function(err) {
            grunt.fatal('Failed to open editor.', err);
          });
          proc.on('exit', function() {
            grunt.log.ok(options.file + ' updated');
            done();
          });
        } else {
          grunt.log.ok(options.file + ' updated');
          done();
        }
      } else {
        grunt.log.writeln(log);
      }
    });
  });
};
