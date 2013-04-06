'use strict';
module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'lib/*.js',
        'tasks/*.js',
        'test/**/*.js'
      ]
    },
    release: {
      options: {
        commitMessage: 'v<%= version %>',
        tagName: 'v<%= version %>'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-release');

  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['jshint']);
};
