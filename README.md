# grunt-conventional-changelog  [![Build Status](https://secure.travis-ci.org/btford/grunt-conventional-changelog.png?branch=master)](http://travis-ci.org/btford/grunt-conventional-changelog)

Generate a changelog using [conventional-changelog](https://github.com/ajoslin/conventional-changelog).

Uses git metadata, based on [these commit conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/).

View [conventional-changelog/CONVENTIONS.md](https://github.com/ajoslin/conventional-changelog/blob/master/CONVENTIONS.md) for a synposis of the conventions with commit examples.


## Example output
- https://github.com/btford/grunt-conventional-changelog/blob/master/CHANGELOG.md
- https://github.com/karma-runner/karma/blob/master/CHANGELOG.md


## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```
$ npm install --save-dev grunt-conventional-changelog
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-conventional-changelog');
```


## Overview
In your project's Gruntfile, add a section named `changelog` to the data object passed into `grunt.initConfig()`.


```js
grunt.initConfig({
  changelog: {
    options: {
      // Task-specific options go here.
    }
  }
});
```


## Options

Supports all options from [conventional-changelog](https://github.com/ajoslin/conventional-changelog#documentation), with the following additions:

### dest
Defaults to `CHANGELOG.md`. The destination to write the changelog, and to read the existing changelog from.

### editor (*deprecated*)
If specified, it runs given command before finishing the task. This is useful if you want to manually polish the generated changelog. For instance you can set it to `subl -w`. **This option will be removed in the next major release. Please use [grunt-shell](https://github.com/sindresorhus/grunt-shell) or [grunt-spawn](https://github.com/fir3pho3nixx/grunt-spawn) instead.**


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

grunt.registerTask('publish', ['changelog', 'shell:changelog', 'release']);

// or

grunt.registerTask('publish', ['changelog', 'spawn:changelog', 'release']);
```


## License
BSD
