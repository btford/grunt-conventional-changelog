<a name="6.1.0"></a>
# [6.1.0](https://github.com/btford/grunt-conventional-changelog/compare/v6.0.1...v6.1.0) (2016-02-13)


### Features

* **debug:** use conventional-changelog 1.1.0 and enable debug ([ecbaf63](https://github.com/btford/grunt-conventional-changelog/commit/ecbaf63))



<a name="6.0.1"></a>
## [6.0.1](https://github.com/btford/grunt-conventional-changelog/compare/v6.0.0...v6.0.1) (2016-02-11)


### Bug Fixes

* **log:** should say "Modified" how many files ([15f7955](https://github.com/btford/grunt-conventional-changelog/commit/15f7955))



<a name="6.0.0"></a>
# [6.0.0](https://github.com/btford/grunt-conventional-changelog/compare/v5.0.0...v6.0.0) (2016-02-11)


### Bug Fixes

* **concat:** make sure the encoding is always buffer ([75fc4ee](https://github.com/btford/grunt-conventional-changelog/commit/75fc4ee))
* **error:** attach handler to the stream ([a54a194](https://github.com/btford/grunt-conventional-changelog/commit/a54a194))

### Chores

* **deps:** bump ([0320cba](https://github.com/btford/grunt-conventional-changelog/commit/0320cba))


### BREAKING CHANGES

* deps: Using conventional-changelog v1.



<a name="5.0.0"></a>
# [5.0.0](https://github.com/btford/grunt-conventional-changelog/compare/v4.1.0...v5.0.0) (2015-09-30)


### Features

* **deps:** bump ([bacd631](https://github.com/btford/grunt-conventional-changelog/commit/bacd631))


### BREAKING CHANGES

* deps: Use conventional-changelog^0.5.0



<a name="4.1.0"></a>
# [4.1.0](https://github.com/btford/grunt-conventional-changelog/compare/v4.0.0...v4.1.0) (2015-08-15)


**deps:** use conventional-changelog@0.4.0



<a name="4.0.0"></a>
# [4.0.0](https://github.com/btford/grunt-conventional-changelog/compare/v3.0.0...v4.0.0) (2015-08-09)


### Features

* **deps:** use conventional-changelog@0.3.0 ([cc51971](https://github.com/btford/grunt-conventional-changelog/commit/cc51971))



<a name="3.0.0"></a>
# 3.0.0 (2015-07-24)


### Features

* **deps:** bump conventional-changelog to ^0.2.1 and use new api ([88212f8](https://github.com/btford/grunt-conventional-changelog/commit/88212f8))



<a name="2.0.2"></a>
## 2.0.2 (2015-07-22)




<a name="2.0.1"></a>
## 2.0.1 (2015-07-20)


### Bug Fixes

* **warn:** pass in warn ([04873db](https://github.com/btford/grunt-conventional-changelog/commit/04873db))



<a name="2.0.0"></a>
# 2.0.0 (2015-07-20)


### Features

* **deprecated:** remove deprecated code ([631ce49](https://github.com/btford/grunt-conventional-changelog/commit/631ce49))
* **grunt:** make this a multi task ([4c6f3a0](https://github.com/btford/grunt-conventional-changelog/commit/4c6f3a0))
* **package:** add more keywords and fix description ([4cd34d7](https://github.com/btford/grunt-conventional-changelog/commit/4cd34d7))
* use conventional-changelog@0.1.0 ([c1a6ede](https://github.com/btford/grunt-conventional-changelog/commit/c1a6ede)), closes [#43](https://github.com/btford/grunt-conventional-changelog/issues/43) [#50](https://github.com/btford/grunt-conventional-changelog/issues/50)


### BREAKING CHANGES

* conventional-changelog@0.1.0 is rewritten and so is this module. No backward compatibility. Checkout the docs for more info.



<a name"1.2.2"></a>
### 1.2.2 (2015-05-02)


#### Bug Fixes

* **dest:** do not ignore `options.dest` ([1dbf0a8c](https://github.com/btford/grunt-conventional-changelog/commit/1dbf0a8c), closes [#55](https://github.com/btford/grunt-conventional-changelog/issues/55))
* **grunt:** bump task should work properly ([488bb2eb](https://github.com/btford/grunt-conventional-changelog/commit/488bb2eb))


<a name"1.2.1"></a>
### 1.2.1 (2015-04-03)


#### Bump conventional-changelog to v0.0.17


<a name"1.2.0"></a>
## 1.2.0 (2015-03-31)


#### Bug Fixes

* **task:** fix that all editors can be started in config ([35a92b1d](https://github.com/btford/grunt-conventional-changelog/commit/35a92b1d), closes [#35](https://github.com/btford/grunt-conventional-changelog/issues/35))


#### Breaking Changes

* This module no longer reads your package.json to find version and repository. This logic is moved to conventional-changelog. We want to make this one a pure grunt wrapper.

 ([0f9562ff](https://github.com/btford/grunt-conventional-changelog/commit/0f9562ff))


<a name="1.0.0"></a>
## 1.1.0 (2014-02-11)


#### Bug Fixes

* make changelog work if no githubRepo specified ([890aac96](https://github.com/btford/grunt-conventional-changelog/commit/890aac9682dc4e4a46a7bd247f103e267c615d94))
* append if prepend set to false ([bdc56349](https://github.com/btford/grunt-conventional-changelog/commit/bdc563498d21de2be468c38ed3791825f4646146))
* Write whether file exists or not ([a2f663c0](https://github.com/btford/grunt-conventional-changelog/commit/a2f663c0c08bd7cbc6316389d89d6c327b0bd7db))
* **changelog:** cannot generate changelog for first tag () ([706a284b](https://github.com/btford/grunt-conventional-changelog/commit/706a284b531719f2bad7a0f9b4bbbd842af47909), closes [#27](https://github.com/btford/grunt-conventional-changelog/issues/27))


#### Features

* parse multiple "Closes" definitions ([57e93d77](https://github.com/btford/grunt-conventional-changelog/commit/57e93d77de638d7701d6df837f216ca79ccf18fa))
* parse Closes/Fixes from subject ([8bcd7a39](https://github.com/btford/grunt-conventional-changelog/commit/8bcd7a39c2e32cad775af874d26ec91cb56a3a4e))
* replace with the changelog task from karma ([25a01c7c](https://github.com/btford/grunt-conventional-changelog/commit/25a01c7c7e55bcc2f87fb34e850b6c254f70ee7f))
* **validator:**
  * allow 100 characters in commit message () ([9982d897](https://github.com/btford/grunt-conventional-changelog/commit/9982d89753137d474b28d525bf323798dc7210f6), closes [#28](https://github.com/btford/grunt-conventional-changelog/issues/28))
  * show list of available types on error ([4aee5b8e](https://github.com/btford/grunt-conventional-changelog/commit/4aee5b8ed457b95e2b084661aa52335f290216f5))


#### Breaking Changes

* `options.github` no longer supported. Use the
`repository` option instead.

To migrate, change the following:

```js
options: {
  github: 'me/project'
}
```

To:

```js
options: {
  repository: 'https://github.com/me/project'
}
```
 ([caa14d69](https://github.com/btford/grunt-conventional-changelog/commit/caa14d694ed14b0ec322e85533cf4e350136e501))


<a name="v1.0.0"></a>
## v1.0.0 (2013-07-17)


#### Bug Fixes

* append if prepend set to false ([bdc56349](https://github.com/btford/grunt-conventional-changelog/commit/bdc563498d21de2be468c38ed3791825f4646146))
* Write whether file exists or not ([a2f663c0](https://github.com/btford/grunt-conventional-changelog/commit/a2f663c0c08bd7cbc6316389d89d6c327b0bd7db))


#### Features

* parse multiple "Closes" definitions ([57e93d77](https://github.com/btford/grunt-conventional-changelog/commit/57e93d77de638d7701d6df837f216ca79ccf18fa))
* parse Closes/Fixes from subject ([8bcd7a39](https://github.com/btford/grunt-conventional-changelog/commit/8bcd7a39c2e32cad775af874d26ec91cb56a3a4e))
* replace with the changelog task from karma ([25a01c7c](https://github.com/btford/grunt-conventional-changelog/commit/25a01c7c7e55bcc2f87fb34e850b6c254f70ee7f))

<a name="v0.1.2"></a>
### v0.1.2 (2013-06-23)


#### Bug Fixes

* **log:** correctly generate links to GitHub commits ([de15bde5](https://github.com/btford/grunt-conventional-changelog/commit/de15bde55e4ed11fc33c85c43f8ffdf7d01efe2f))

<a name="v0.1.1"></a>
### v0.1.1 (2013-06-11)


#### Bug Fixes

* **task:** Fix shelljs dependency problem ([2db8cf96](https://github.com/btford/grunt-conventional-changelog/commit/2db8cf969b2ac0aa4d2f9f6ab908b3f7f96f8cf2))

<a name="v0.1.0"></a>
## v0.1.0 (2013-05-30)


#### Bug Fixes

* **gruntfile:** load package.json ([8c4cb685](https://github.com/btford/grunt-conventional-changelog/commit/8c4cb685f161e1ed920138fd65d9d13be501ed33))
* **task:**
  * fix issue when no changelog exist yet ([c1a31f56](https://github.com/btford/grunt-conventional-changelog/commit/c1a31f566ee1fecc4f1ff3807d98d1a6aedf87a9))
  * version regex now matches the commit messages created by `npm version` by defaul ([db3985d2](https://github.com/btford/grunt-conventional-changelog/commit/db3985d2069ba909b413fe7bcbb8521db2f8b7e2))


#### Features

* **changelog:**
  * Allow 'enforce' option: Adds a git hook for commit conventions ([1cbe92cf](https://github.com/btford/grunt-conventional-changelog/commit/1cbe92cfa3f8f200ec42f7ef709c33813c230a03))
  * allow 'version' option, to use instead of 'pkg.version' ([4a06569a](https://github.com/btford/grunt-conventional-changelog/commit/4a06569ad0c0024bde2d4b098ec839cd023ceeaa))
* **log:**
  * Add smart 'github' option for commit links ([6ac1083a](https://github.com/btford/grunt-conventional-changelog/commit/6ac1083a51a5b01e9c32f230254488e45f733b47))
  * Add breaking changes section ([04ecfceb](https://github.com/btford/grunt-conventional-changelog/commit/04ecfceb57626ab7373eb66db25e1a465469d985))
  * dogfooding - this task uses itself to generate its own changelogs ([746e9ffc](https://github.com/btford/grunt-conventional-changelog/commit/746e9ffca4dd8e90f359a424dca1cfad0a4e4ccf))

<a name="v0.0.12"></a>
### v0.0.12 (2013-04-06)


#### Features

* **log:** automatically split notes based on release version ([5545fe45](https://github.com/btford/grunt-conventional-changelog/commit/5545fe456f3376ae0d089face51a8b53bcad038d))
* **readme:** improve the readme ([0aeec479](https://github.com/btford/grunt-conventional-changelog/commit/0aeec479cfa68e04c33d81bd994a0445f7ddce26))

<a name="v0.0.11"></a>
### v0.0.11 (2013-04-05)


#### Bug Fixes

* **grunt:** add .jshintrc ([fd79b784](https://github.com/btford/grunt-conventional-changelog/commit/fd79b78483498e6e0cadedb9e4d4bb945fe5c644))
* **readme:** rename project, add license ([7320c25f](https://github.com/btford/grunt-conventional-changelog/commit/7320c25fa03b741047a584dbd1f024d62d98de9b))
* **release:** push to github and npm ([c794c502](https://github.com/btford/grunt-conventional-changelog/commit/c794c5023581796fc0853c3db5c36355ef897052))

