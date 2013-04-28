'use strict';

var fs = require('fs');

module.exports = function (grunt) {

  // based on: https://github.com/angular-ui/bootstrap/commit/9a683eebccaeb6bfc742e6768562eb19ddd2216c
  grunt.registerTask('changelog', 'generate a changelog from git metadata', function () {

    var done = grunt.task.current.async();

    var options = this.options({
      // dest: 'CHANGELOG.md',
      prepend: true // false to append
    });

    var template;
    if (options.templateFile) {
      template = grunt.file.read(options.templateFile);
    } else {
      template = fs.readFileSync(__dirname + '/../template/changelog.md', 'utf8');
    }

    var gitArgs = [
      'log',
      '--format=%H%n%s%n%b%n==END=='
    ];
    if (this.args.length > 0) {
      var changeFrom = this.args[0], changeTo = this.args[1] || 'HEAD';
      runGitLog( gitArgs.concat(changeFrom + '..' + changeTo) );

    } else {
      //Based on: https://github.com/angular/angular.js/blob/master/changelog.js#L184
      //Use tags to find the last commit
      grunt.util.spawn({
        cmd: process.platform === 'win32' ? 'git.cmd' : 'git',
        args: ['describe', '--tags', '--abbrev=0']
      }, function(code, stdout, stderr) {
        if (stderr) {
          return done(false);
        }
        var lastTag = stdout.toString().trim();
        runGitLog( gitArgs.concat(lastTag + '..HEAD') );
      });
    }


    function runGitLog(args) {

      grunt.util.spawn({
        cmd: process.platform === 'win32' ?  'git.cmd' : 'git',
        args: args
      }, function (err, stdout, stderr) {

        if (stderr) {
          return done(false);
        }

        var changelog = {};

        // based on: https://github.com/angular/angular.js/blob/master/changelog.js#L50
        // see also: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/
        var COMMIT_MSG_REGEXP = /^(.*)\((.*)\)\:\s(.*)$/;
        var BREAKING_CHANGE_REGEXP = /BREAKING CHANGE:([\s\S]*)/;
        var gitlog = stdout.toString().split('\n==END==\n').reverse();

        function addChange(changeType, changeScope, sha1, changeMessage) {
          if (!changelog[changeType]) {
            changelog[changeType] = {};
          }
          if (!changelog[changeType][changeScope]) {
            changelog[changeType][changeScope] = [];
          }
          changelog[changeType][changeScope].push({
            sha1: sha1,
            msg: changeMessage
          });
        }

        gitlog.forEach(function (logItem) {
          var lines = logItem.split('\n');
          var sha1 = lines.shift().substr(0,8); //Only need first 7 chars 
          var subject = lines.shift();

          var changeMatch,
            changeType,
            changeScope,
            changeMessage;
          if ( (changeMatch = subject.match(COMMIT_MSG_REGEXP)) ) {
            //if it conforms to the changelog style
            changeType = changeMatch[1];
            changeScope = changeMatch[2];
            changeMessage = changeMatch[3];
          } else {
            //otherwise
            changeType = changeScope = 'other';
            changeMessage = subject;
          }

          addChange(changeType, changeScope, sha1, changeMessage);

          var breakingMatch = logItem.match(BREAKING_CHANGE_REGEXP);
          if (breakingMatch) {
            var breakingMessage = breakingMatch[1];
            addChange('breaking', changeScope, sha1, breakingMessage);
          }
        });

        var newLog = grunt.template.process(template, {
          data: {
            changelog: changelog,
            today: grunt.template.today('yyyy-mm-dd'),
            version : grunt.config('pkg.version')
          }
        });

        if (options.dest) {
          var log = grunt.file.exists(options.dest) ?
            grunt.file.read(options.dest) : '';
          if (options.prepend) {
            log = newLog + log;
          } else {
            log += newLog;
          }
          grunt.file.write(options.dest, log);
        } else {
          console.log(newLog);
        }
        done();
      });
    }
  });
};
