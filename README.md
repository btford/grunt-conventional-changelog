#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage Status][coveralls-image]][coveralls-url]

> Generate a changelog using [conventional-changelog](https://github.com/ajoslin/conventional-changelog)

*Issues with the output should be reported on the `conventional-changelog` [issue tracker](https://github.com/ajoslin/conventional-changelog/issues).*


## Install

```
$ npm install --save-dev grunt-conventional-changelog
```


## Usage

```js
grunt.loadNpmTasks('grunt-conventional-changelog');

grunt.initConfig({
  conventionalChangelog: {
    options: {
      changelogOpts: {
        // conventional-changelog options go here
        preset: 'angular'
      },
      context: {
        // context goes here
      },
      gitRawCommitsOpts: {
        // git-raw-commits options go here
      },
      parserOpts: {
        // conventional-commits-parser options go here
      },
      writerOpts: {
        // conventional-changelog-writer options go here
      }
    },
    release: {
      src: 'CHANGELOG.md'
    }
  }
});

grunt.registerTask('default', ['conventionalChangelog']);
```


## API

See the [conventional-changelog](https://github.com/ajoslin/conventional-changelog) docs.

There are some changes:

### changelogOpts

#### warn

It is `grunt.verbose.writeln`.


## Edit your changelog manually

Sometimes after auto-generating the changelog you want to be able to review the generated changes or add some notes to the current release, you can polish your changelog manually without changing your workflow (you might use `grunt-release` in the workflow but need grunt to wait until you have finished polishing your changelog).

Here are some examples of how to achieve this.

```js
grunt.initConfig({

  // grunt-shell
  shell: {
    changelog: {
      options: {
        stdinRawMode: true
      },
      command: 'subl -w CHANGELOG.md',
    }
  },

  // or grunt-spawn
  spawn: {
    changelog: {
      command: 'vim',
      pattern: 'CHANGELOG.md',
      commandArgs: ['{0}'],
      opts: {
        stdio: 'inherit'
      }
    }
  },

});

...

grunt.registerTask('publish', ['conventionalChangelog', 'shell:changelog', 'release']);

// or

grunt.registerTask('publish', ['conventionalChangelog', 'spawn:changelog', 'release']);
```


## License

MIT


[npm-image]: https://badge.fury.io/js/grunt-conventional-changelog.svg
[npm-url]: https://npmjs.org/package/grunt-conventional-changelog
[travis-image]: https://travis-ci.org/btford/grunt-conventional-changelog.svg?branch=master
[travis-url]: https://travis-ci.org/btford/grunt-conventional-changelog
[daviddm-image]: https://david-dm.org/btford/grunt-conventional-changelog.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/btford/grunt-conventional-changelog
[coveralls-image]: https://coveralls.io/repos/github/btford/grunt-conventional-changelog/badge.svg
[coveralls-url]: https://coveralls.io/r/btford/grunt-conventional-changelog
