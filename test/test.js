'use strict';
var readFileSync = require('fs').readFileSync;

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.conventionalChangelog = {
  setUp: function(done) {
    this.allBlocks = readFileSync('tmp/all-blocks.md', 'utf-8');
    this.append = readFileSync('tmp/append.md', 'utf-8');
    this.multipleFiles1 = readFileSync('tmp/multiple-files/_CHANGELOG.md', 'utf-8');
    this.multipleFiles2 = readFileSync('tmp/multiple-files/_CHANGELOG2.md', 'utf-8');
    this.multipleSrcToOneDest = readFileSync('tmp/multiple-src-to-one-dest.md', 'utf-8');
    this.noDestMultiple1 = readFileSync('tmp/no-dest-multiple/_CHANGELOG.md', 'utf-8');
    this.noDestMultiple2 = readFileSync('tmp/no-dest-multiple/_CHANGELOG2.md', 'utf-8');
    this.noDestSingle = readFileSync('tmp/no-dest-single/_CHANGELOG.md', 'utf-8');
    this.noSrcAllBlocks = readFileSync('tmp/no-src-all-blocks.md', 'utf-8');
    this.prepend = readFileSync('tmp/prepend.md', 'utf-8');

    // setup here if necessary
    done();
  },
  allBlocks: function(test) {
    test.expect(1);
    test.ok(!this.allBlocks.match(/blablabla Some previous changelog/));

    test.done();
  },
  append: function(test) {
    test.expect(1);
    test.ok(this.append.match(/^blablabla Some previous changelog[\w\W]+$/));

    test.done();
  },
  multipleFiles: function(test) {
    test.expect(2);
    test.ok(this.multipleFiles1.match(/[\w\W]+blablabla Some previous changelog.\n$/));
    test.ok(this.multipleFiles2.match(/^[\w\W]+My changelog 2.\n$/));

    test.done();
  },
  multipleSrcToOneDest: function(test) {
    test.expect(1);
    test.ok(this.multipleSrcToOneDest.match(/[\w\W]+blablabla Some previous changelog.\n$/));

    test.done();
  },
  noDestMultiple: function(test) {
    test.expect(2);
    test.ok(this.noDestMultiple1.match(/[\w\W]+blablabla Some previous changelog.\n$/));
    test.ok(this.noDestMultiple2.match(/[\w\W]+My changelog 2.\n$/));

    test.done();
  },
  noDestSingle: function(test) {
    test.expect(1);
    test.ok(this.noDestMultiple1.match(/[\w\W]+blablabla Some previous changelog.\n$/));

    test.done();
  },
  noSrcAllBlocks: function(test) {
    test.expect(1);
    test.ok(!this.noSrcAllBlocks.match(/blablabla Some previous changelog/));

    test.done();
  },
  prepend: function(test) {
    test.expect(1);
    test.ok(this.prepend.match(/[\w\W]+blablabla Some previous changelog.\n$/));

    test.done();
  }
};
