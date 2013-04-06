'use strict';

var fs = require('fs');
var template = fs.readFileSync(__dirname + '/../template/changelog.md', 'utf8');

module.exports = function (grunt) {

  // based on: https://github.com/angular-ui/bootstrap/commit/9a683eebccaeb6bfc742e6768562eb19ddd2216c
  grunt.registerTask('changelog', 'generate a changelog from git metadata', function () {

    var changeFrom = this.args[0],
      changeTo = this.args[1] || 'HEAD';

    var done = grunt.task.current.async();
    var child = grunt.util.spawn({
      cmd: process.platform === 'win32' ?
        'git.cmd' : 'git',
      args: [
        'log',
        changeFrom + '..' + changeTo,
        '--oneline'
      ]
    }, function (err, stdout, stderr) {

      var changelog = {};

      // based on: https://github.com/angular/angular.js/blob/master/changelog.js#L50
      // see also: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/
      var COMMIT_MSG_REGEXP = /^(.*)\((.*)\)\:\s(.*)$/;
      var gitlog = stdout.toString().split('\n').reverse();

      if (stderr) {
        done(false);
      } else {
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

        console.log(grunt.template.process(template, {
          data: {
            changelog: changelog,
            today: grunt.template.today('yyyy-mm-dd'),
            version : grunt.config('pkg.version')
          }
        }));

        done();
      }
    });

  });
};
