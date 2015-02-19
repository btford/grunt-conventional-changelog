'use strict';

var fs = require('fs');
var test = require('ava');

test('generates changelog', function(t) {
  t.assert(/## v2.0.0/.test(fs.readFileSync(__dirname + '/tmp/changelog', 'utf8')));
  t.end();
});
