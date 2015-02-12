'use strict';
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'tasks/*.js',
      ]
    },
    release: {
      options: {
        commitMessage: 'v<%= version %>',
        tagName: 'v<%= version %>'
      }
    },
    changelog: {
      options: {
        file: 'test/tmp/changelog',
        from: 'v0.1.0',
        to: 'v1.1.0',
        version: 'v2.0.0'
      }
    },
    clean: {
      test: ['test/tmp/**']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-release');
  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['clean', 'jshint', 'changelog']);
};
