var exec = require('child_process').exec;
var changelog = require('../lib/changelog');


// TODO: clean this up and write tests for it
var figureOutGithubRepo = function(githubRepo, pkg) {
  githubRepo = githubRepo || '';

  //If github repo isn't given, try to read it from the package file
  if (!githubRepo && pkg) {
    if (pkg.repository) {
      githubRepo = pkg.repository.url;
    } else if (pkg.homepage) {
      //If it's a github page, but not a *.github.(io|com) page
      if (pkg.homepage.indexOf('github.com') > -1 &&
          !pkg.homepage.match(/\.github\.(com|io)/)) {
        githubRepo = pkg.homepage;
      }
    }
  }

  //User could set option eg 'github: "btford/grunt-conventional-changelog'
  if (githubRepo.indexOf('github.com') === -1) {
    githubRepo = 'http://github.com/' + githubRepo;
  }

  githubRepo = githubRepo
      .replace(/^git:\/\//, 'http://') //get rid of git://
      .replace(/\/$/, '') //get rid of trailing slash
      .replace(/\.git$/, ''); //get rid of trailing .git

  return githubRepo;
};


module.exports = function (grunt) {

  var DESC = 'Generate a changelog from git metadata.';
  grunt.registerTask('changelog', DESC, function () {

    var done = this.async();
    var options = this.options({
      dest: 'CHANGELOG.md',
      //false to append
      prepend: true,
      //default from package.json
      github: null,
      //default value from package.json
      version: null,
      // 'sublime -w'
      editor: null,
      //default command to figure out last tag. Can be overwritten to match different workflows
      previousTagCmd: 'git describe --tags --abbrev=0'
    });

    var pkg = grunt.config('pkg') || grunt.file.readJSON('package.json');
    var githubRepo = figureOutGithubRepo(options.github, pkg);
    var newVersion = options.version || pkg.version;


    // generate changelog
    changelog.generate(githubRepo, 'v' + newVersion, options.previousTagCmd).then(function(data) {
      var currentLog = grunt.file.exists(options.dest) ? grunt.file.read(options.dest) : '';
      grunt.file.write(options.dest, options.prepend ? data + currentLog : currentLog + data);

      if (options.editor) {
        exec(options.editor + ' ' + options.dest, function(err) {
          if (err) {
            return grunt.fatal('Can not generate changelog.');
          }

          grunt.log.ok(options.dest + ' updated');
          done();
        });
      } else {
        grunt.log.ok(options.dest + ' updated');
        done();
      }
    });
  });
};
