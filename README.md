# grunt-conventional-changelog
Generate a changelog from git metadata.

Uses [these](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/) conventions.

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

### dest
The destination to write the changelog. If undefined, the changelog will be written to `console.log`.

### prepend
Defaults to `true`. If true, prepend new log info to `dest`. If `false`, append new log info.

### templateFile
Template to use. See the [default template](https://raw.github.com/btford/grunt-conventional-changelog/master/template/changelog.md) (used if another isn't provided) for an example of how to write your own.



## Usage Examples

### CLI
Run from the command line:

```shell
grunt changelog:from-rev:to-rev >> CHANGELOG.md
```

`to-rev` defaults to `HEAD` if not provided.

### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  changelog: {
    options: {}
  },
})
```

### Task

Say you have the following `git log --oneline`:

```
6d6f21e feat(build): use Grunt for building Batarang
8f77864 feat(test): switch from testacular to karma
c5db59b v0.4.0
4682d4b feat(something)
...
```

If you provide a `versionRegex`, or tag revisions signifying a new release with a semver like `v1.2.3`, this task will create the following output:

```markdown
# 0.4.0 (2013-04-06)

## Features
### test

* switch from testacular to karma (8f77864)

### build

* use Grunt for building Batarang (6d6f21e)
```


## License
BSD
