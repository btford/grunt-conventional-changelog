var changelog = require('conventional-changelog');
var child_process = require('child_process');
var spawn = child_process.spawn;

module.exports = function (grunt) {

  var DESC = 'Generate a changelog from git metadata.';
  grunt.registerTask('changelog', DESC, function () {

    var done = this.async();
    var pkg = grunt.config('pkg') || grunt.file.readJSON('package.json') || {};

    var options = this.options({
      dest: 'CHANGELOG.md',
      prepend: true,  // false to append
      repository: getPackageRepository(pkg),
      version: pkg.version,
      editor: null,   // 'sublime -w'
      github: null    //deprecated
    });

    //grunt-conventional-changelog options -> conventional-changelog options
    options.file = options.file || options.dest;
    options.log = grunt.log.ok.bind(grunt);
    options.warn = grunt.log.writeln.bind(grunt, '[warn]'.yellow);
    options.repository = options.repository || options.github || '';

    //deprecated options.github
    if (options.github) {
      grunt.log.writeln('`changelog.options.github` is deprecated as of version 1.1.0. Use `options.repository`. \nView the README at http://github.com/btford/grunt-conventional-changelog for more information.');
    }

    changelog(options, function(err, log) {
      if (err) {
        return grunt.fatal('Failed to generate changelog.', err);
      }

      if (options.file) {
        grunt.file.write(options.file, log);
        if (options.editor) {


  	  var cp = spawn(options.editor, [options.file], {
            stdio:'inherit'
          });

          cp.on('exit', function() {
            console.log('editor ended');
            grunt.log.ok(options.file + ' updated');
            done();
          })
          .on('error', function(err){
              return grunt.fatal('Failed to open editor.', err);
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

function getPackageRepository(pkg) {
  var repo = pkg.repository && pkg.repository.url || pkg.repository;

  if (typeof repo !== 'string') {
    return null;
  } else {
    //Change git://github.com/a/b.git to http://github.com/a/b
    return repo.replace(/\.git$/, '').replace(/^git\:/, 'http:');
  }
}

