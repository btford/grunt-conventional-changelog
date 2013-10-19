'use strict';
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
        },

        simplemocha: {
            options: {
                ui: 'bdd',
                reporter: 'dot'
            },
            unit: {
                src: [
                    'test/**/*.coffee'
                ]
            }
        },

        watch: {
            unittests: {
                files: ['test/**/*.coffee', 'lib/**/*.js'],
                tasks: ['test']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-release');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['jshint', 'test']);
    grunt.registerTask('test', ['simplemocha']);
};
