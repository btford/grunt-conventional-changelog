# grunt-conventional-changelog  [![Build Status](https://secure.travis-ci.org/btford/grunt-conventional-changelog.png?branch=master)](http://travis-ci.org/btford/grunt-conventional-changelog)

Generate a changelog using [connvetional-changelog](https://github.com/ajoslin/conventional-changelog).

Uses git metadata, based on [these commit conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/).  

View [conventional-changelog/CONVENTIONS.md](https://github.com/ajoslin/conventional-changelog/blob/master/CONVENTIONS.md) for a synposis of the conventions with commit examples.

## Example output
- https://github.com/btford/grunt-conventional-changelog/blob/master/CHANGELOG.md
- https://github.com/karma-runner/karma/blob/master/CHANGELOG.md

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-conventional-changelog --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

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
  },
})
```

## Options

Supports all options from [conventional-changelog](http://github.com/ajoslin/conventional-changelog), with the following changes and additions:

### dest
Defaults to `CHANGELOG.md`. The destination to write the changelog, and to read the existing changelog from.  

### version
Defaults to version in `grunt.config('pkg')` or `package.json`.

### repository
Defaults to `repository` or `repository.url`, found in `grunt.config('pkg')` or `package.json`.

By default, it expects a github repository. Check [conventional-changelog's README](http://github.com/ajoslin/conventional-changelog) for information on using non-github repositories.

### editor
If specified, it runs given command before finishing the task. This is useful if you want to manually polish the generated changelog.

For instance you can set it to `sublime -w`.

## License
BSD
