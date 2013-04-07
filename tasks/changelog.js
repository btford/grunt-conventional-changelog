'use strict';

var fs = require('fs');

module.exports = function (grunt) {

  // based on: https://github.com/angular-ui/bootstrap/commit/9a683eebccaeb6bfc742e6768562eb19ddd2216c
  grunt.registerTask('changelog', 'generate a changelog from git metadata', function () {

    var options = this.options({
      versionRegex: /^v(\d+)(.\d+)*(-.*)?$/gim, // generate from the last version until this one
      // dest: 'CHANGELOG.md',
      prepend: true // false to append
    });

    var template;
    if (options.templateFile) {
      template = grunt.file.read(options.templateFile);
    } else {
      template = fs.readFileSync(__dirname + '/../template/changelog.md', 'utf8');
    }

    var gitArgs;
    if (this.args.length > 0) {
      var changeFrom = this.args[0];
      var changeTo = this.args[1] || 'HEAD';
      gitArgs = [
        'log',
        changeFrom + '..' + changeTo,
        '--oneline'
      ];
    } else {
      gitArgs = [
        'log',
        '--oneline'
      ];
    }

    var done = grunt.task.current.async();
    grunt.util.spawn({
      cmd: process.platform === 'win32' ?
        'git.cmd' : 'git',
      args: gitArgs
    }, function (err, stdout, stderr) {

      if (stderr) {
        return done(false);
      }

      var changelog = {};

      // based on: https://github.com/angular/angular.js/blob/master/changelog.js#L50
      // see also: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/
      var COMMIT_MSG_REGEXP = /^(.*)\((.*)\)\:\s(.*)$/;
      var gitlog = stdout.toString().split('\n').reverse();

      // if no range was specified, attempt to find the last version commit
      if (gitArgs.length === 2) {
        var i, spl;
        for (i = 0; i < gitlog.length; i++) {
          if (options.versionRegex.test(gitlog[i].toString().substr(8))) {
            spl = i;
            break;
          }
        }
        if (spl) {
          gitlog = gitlog.slice(spl + 1);
        }
      }

      gitlog.forEach(function (logItem) {
        var sha1 = logItem.slice(0, 7);
        var fullMsg = logItem.slice(8);

        var changeType,
          changeScope,
          changeMessage;

        if (COMMIT_MSG_REGEXP.test(fullMsg)) {
          // if it conforms to the changelog style
          var msgMatches = fullMsg.match(COMMIT_MSG_REGEXP);
          changeType = msgMatches[1];
          changeScope = msgMatches[2];
          changeMessage = msgMatches[3];
        } else {
          // otherwise
          changeType = 'other';
          changeMessage = fullMsg;
        }

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
      });

      var newLog = grunt.template.process(template, {
        data: {
          changelog: changelog,
          today: grunt.template.today('yyyy-mm-dd'),
          version : grunt.config('pkg.version')
        }
      });

      if (options.dest) {
        var log = grunt.file.read(options.dest);
        if (options.prepend) {
          log = newLog + log;
        } else {
          log += newLog;
        }
        grunt.file.write(options.dest, log);
      } else {
        console.log(newLog);
      }

    });
  });
};
