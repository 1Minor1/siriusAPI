'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export siriuscore-lib', function() {
    var siriuscore = require('../');
    should.exist(siriuscore.lib);
    should.exist(siriuscore.lib.Transaction);
    should.exist(siriuscore.lib.Block);
  });
});
