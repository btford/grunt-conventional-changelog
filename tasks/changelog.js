var exec = require('child_process').exec;
var changelog = require('../lib/changelog');


// TODO: clean this up and write tests for it
var figureOutRepo = function(githubRepo, bitbucketRepo, pkg) {
    //Check if the user gave either a github or a bitbucket url
    var type = 0,
        repoUrl = "";
    if (githubRepo) {
        console.log("1");
        repoUrl = githubRepo;
        bitbucketRepo = "";
    } else if (bitbucketRepo) {
        type = 2;
        repoUrl = bitbucketRepo;
        githubRepo = "";
    }

    //If github repo isn't given, try to read it from the package file
    if (!type && pkg) {
        if (pkg.repository) {
            type = 3;
            repoUrl = pkg.repository.url;
        } else if (pkg.homepage) {
            //If it's a bitbucket page or github page (but not a *.github.(io|com) page)
            if (pkg.homepage.indexOf('github.com') > -1 && !pkg.homepage.match(/\.github\.(com|io)/) || pkg.homepage.indexOf('bitbucket.org') > -1) {
                type = 3;
                repoUrl = pkg.homepage;
            }
        }
    }

    //Check if the URL in the package.json is a bitbucket or a github url
    if (type == 3) {
        if (repoUrl.indexOf('github.com') > -1) {
            type = 1;
        } else if (repoUrl.indexOf('bitbucket.org') > -1) {
            type = 2;
        }
    }

    //User could set option eg 'github: "btford/grunt-conventional-changelog'
    if (type === 1 && repoUrl.indexOf('github.com') === -1) {
        repoUrl = 'http://github.com/' + repoUrl;
    } else if (type === 2 && repoUrl.indexOf('bitbucket.org') === -1) {
        repoUrl = 'http://bitbucket.org/' + repoUrl;
    }

    repoUrl = repoUrl
        .replace(/^git:\/\//, 'http://') //get rid of git://
    .replace(/\/$/, '') //get rid of trailing slash
    .replace(/\.git$/, ''); //get rid of trailing .git

    return [type, repoUrl];
};


module.exports = function(grunt) {

    var DESC = 'Generate a changelog from git metadata.';
    grunt.registerTask('changelog', DESC, function() {

        var done = this.async();
        var options = this.options({
            dest: 'CHANGELOG.md',
            prepend: true, // false to append
            github: null, // default from package.json
            bitbucket: null, // default from package.json
            version: null, // default value from package.json
            editor: null // 'sublime -w'
        });

        var pkg = grunt.config('pkg') || grunt.file.readJSON('package.json');
        var repoUrlAndType = figureOutRepo(options.github, options.bitbucket, pkg);
        var newVersion = options.version || pkg.version;


        // generate changelog
        changelog.generate(repoUrlAndType[0], repoUrlAndType[1], 'v' + newVersion).then(function(data) {
            var currentLog = grunt.file.exists(options.dest) ? grunt.file.read(options.dest) : '';
            grunt.file.write(options.dest, options.prepend ? data + currentLog : currentLog + data);

            if (options.editor) {
                exec(options.editor + ' ' + options.dest, function(err) {
                    if (err) {
                        return grunt.fatal('Can not generate changelog.');
                    }

                    grunt.log.ok(options.dest + ' updated');
                    done();
                });
            } else {
                grunt.log.ok(options.dest + ' updated');
                done();
            }
        });
    });
};
