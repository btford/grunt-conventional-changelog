# grunt-conventional-changelog  [![Build Status](https://secure.travis-ci.org/btford/grunt-conventional-changelog.png?branch=master)](http://travis-ci.org/btford/grunt-conventional-changelog)

Generate a changelog based on the git commit messages.

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

## Git Commit Guidelines

These rules are adopted from the AngularJS project.

### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on github as well as in various git tools.

### Type
Is recommended to be one of these (only **feat** and **fix** show up in the changelog:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug or adds a feature
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

### Scope
The scope could be anything specifying place of the commit change. For example `$location`,
`$browser`, `$compile`, `$rootScope`, `ngHref`, `ngClick`, `ngView`, etc...

### Subject
The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes"
The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

#### Breaking Changes
Should be in the footer of the commit with the prefix: `BREAKING CHANGE`

A detailed explanation can be found in this [document][commit-message-format].

## Options

### dest
Defaults to `CHANGELOG.md`. The destination to write the changelog.

### prepend
Defaults to `true`. If true, prepend new log info to `dest`. If `false`, append new log info.

### github
Specifies the github repository to use to link to commits in the changelog.

By default, tries to find a github repository from the information in `package.json`.

Allows a full repository url, or simply `username/repository`.

Example configurations:
```js
github: 'btford/grunt-conventional-changelog'
```
```js
github: 'http://github.com/angular/angular.js'
```

### version
A string which contains the value of the version which is used by grunt-conventional-changelog.
If no version is specified, grunt-conventional-changelog looks for the version in `pkg.version`.

### editor
If specified, it runs given command before finishing the task. This is useful if you want to manually polish the generated changelog.

For instance you can set it to `sublime -w`.

## License
BSD

[commit-message-format]: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#
