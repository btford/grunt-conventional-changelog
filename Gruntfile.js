'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        '*.js',
        'test/*.js',
        'tasks/*.js'
      ]
    },
    jscs: {
      options: {
        config: '.jscsrc'
      },
      all: [
        '*.js',
        'test/*.js',
        'tasks/*.js'
      ]
    },
    nodeunit: {
      tests: ['test/*.js']
    },
    changelog: {
      options: {
        file: 'CHANGELOG.md'
      }
    },
    bump: {
      options: {
        updateConfigs: ['pkg'],
        commitFiles: ['package.json', 'CHANGELOG.md'],
        commitMessage: 'chore: release v%VERSION%'
      }
    }
  });

  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-npm');
  grunt.loadTasks('tasks');

  grunt.registerTask('test', ['jshint', 'jscs', 'nodeunit']);
  grunt.registerTask('default', ['test']);
  grunt.registerTask('release', 'bump, changelog and publish to npm.', function(type) {
    grunt.task.run([
      'bump:' + (type || 'patch') + ':bump-only',
      'changelog',
      'bump-commit',
      'npm-publish'
    ]);
  });
};
