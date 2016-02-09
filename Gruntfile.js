'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      test: 'tmp',
      coverage: 'coverage'
    },
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
    copy: {
      noDestSingle: {
        src: 'test/fixtures/_CHANGELOG.md',
        dest: 'tmp/no-dest-single/_CHANGELOG.md'
      },
      noDestMultiple: {
        expand: true,
        flatten: true,
        src: 'test/fixtures/*.md',
        dest: 'tmp/no-dest-multiple/'
      }
    },
    nodeunit: {
      tests: ['test/*.js']
    },
    conventionalChangelog: {
      options: {
        changelogOpts: {
          preset: 'angular',
          outputUnreleased: true
        }
      },
      append: {
        options: {
          changelogOpts: {
            preset: 'angular',
            append: true
          }
        },
        src: 'test/fixtures/_CHANGELOG.md',
        dest: 'tmp/append.md'
      },
      prepend: {
        src: 'test/fixtures/_CHANGELOG.md',
        dest: 'tmp/prepend.md'
      },
      allBlocks: {
        options: {
          changelogOpts: {
            preset: 'angular',
            releaseCount: 0
          }
        },
        src: 'test/fixtures/_CHANGELOG.md',
        dest: 'tmp/all-blocks.md'
      },
      multiFiles: {
        expand: true,
        flatten: true,
        src: 'test/fixtures/*.md',
        dest: 'tmp/multiple-files/'
      },
      multipleSrcToOneDest: {
        src: 'test/fixtures/*.md',
        dest: 'tmp/multiple-src-to-one-dest.md'
      },
      noDestSingle: {
        src: 'tmp/no-dest-single/_CHANGELOG.md'
      },
      noDestMultiple: {
        src: 'tmp/no-dest-multiple/*.md'
      },
      noSrcAllBlocks: {
        options: {
          changelogOpts: {
            preset: 'angular',
            releaseCount: 0
          }
        },
        dest: 'tmp/no-src-all-blocks.md'
      },
      // This task should fail
      // noSrc: {
      //   dest: 'tmp/no-src.md'
      // },
      noFiles: {},
      emptyOutput: {
        options: {
          writerOpts: {
            transform: function() {
              return false;
            }
          }
        }
      },
      release: {
        src: 'CHANGELOG.md'
      }
    },
    instrument: {
      files: 'tasks/**/*.js',
      options: {
        lazy: true,
        basePath: 'coverage/instrument/'
      }
    },
    reloadTasks: {
      rootPath: 'coverage/instrument/tasks'
    },
    storeCoverage: {
      options: {
        dir: 'coverage/reports'
      }
    },
    makeReport: {
      src: 'coverage/reports/**/*.json',
      options: {
        type: 'lcov',
        dir: 'coverage',
        print: 'detail'
      }
    },
    coveralls: {
      // Options relevant to all targets
      options: {
        // When true, grunt-coveralls will only print a warning rather than
        // an error, to prevent CI builds from failing unnecessarily (e.g. if
        // coveralls.io is down). Optional, defaults to false.
        force: false
      },
      all: {
        // LCOV coverage file (can be string, glob or array)
        src: 'coverage/lcov.info',
        options: {
          // Any options for just this target
        }
      },
    },
    conventionalGithubReleaser: {
      release: {
        options: {
          auth: {
            type: 'oauth',
            token: process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN
          },
          changelogOpts: {
            preset: 'angular'
          }
        }
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

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-istanbul');
  grunt.loadTasks('tasks');

  grunt.registerTask('lint', ['jshint', 'jscs']);
  grunt.registerTask('conventionalChangelog:test', [
    'conventionalChangelog:append',
    'conventionalChangelog:prepend',
    'conventionalChangelog:allBlocks',
    'conventionalChangelog:multiFiles',
    'conventionalChangelog:multipleSrcToOneDest',
    'conventionalChangelog:noDestSingle',
    'conventionalChangelog:noDestMultiple',
    'conventionalChangelog:noSrcAllBlocks',
    // 'conventionalChangelog:noSrc',
    'conventionalChangelog:noFiles'
  ]);
  grunt.registerTask('test', ['lint', 'clean:test', 'copy', 'conventionalChangelog:test', 'nodeunit']);
  grunt.registerTask('coverage', ['clean', 'instrument', 'reloadTasks', 'copy', 'conventionalChangelog:test', 'storeCoverage', 'makeReport']);
  grunt.registerTask('sendCoverallsInfo', ['coverage', 'coveralls', 'clean']);
  grunt.registerTask('default', ['lint', 'coverage', 'clean']);
  grunt.registerTask('release', 'bump, changelog and publish to npm.', function(type) {
    grunt.task.run([
      'bump:' + (type || 'patch') + ':bump-only',
      'conventionalChangelog:release',
      'bump-commit',
      'conventionalGithubReleaser',
      'npm-publish'
    ]);
  });
};
