'use strict';

var path = require('path');
var should = require('chai').should();
var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('#defaultConfig', function() {
  var expectedExecPath = path.resolve(__dirname, '../../bin/siriusd');

  it('will return expected configuration', function() {
    var config = JSON.stringify({
      network: 'livenet',
      port: 3001,
      services: [
        'siriusd',
        'web'
      ],
      servicesConfig: {
        siriusd: {
          spawn: {
            datadir: process.env.HOME + '/.bitcore/data',
            exec: expectedExecPath
          }
        }
      }
    }, null, 2);
    var defaultConfig = proxyquire('../../lib/scaffold/default-config', {
      fs: {
        existsSync: sinon.stub().returns(false),
        writeFileSync: function(path, data) {
          path.should.equal(process.env.HOME + '/.bitcore/bitcore-node.json');
          data.should.equal(config);
        },
        readFileSync: function() {
          return config;
        }
      },
      mkdirp: {
        sync: sinon.stub()
      }
    });
    var home = process.env.HOME;
    var info = defaultConfig();
    info.path.should.equal(home + '/.bitcore');
    info.config.network.should.equal('livenet');
    info.config.port.should.equal(3001);
    info.config.services.should.deep.equal(['siriusd', 'web']);
    var siriusd = info.config.servicesConfig.siriusd;
    should.exist(siriusd);
    siriusd.spawn.datadir.should.equal(home + '/.bitcore/data');
    siriusd.spawn.exec.should.equal(expectedExecPath);
  });
  it('will include additional services', function() {
    var config = JSON.stringify({
      network: 'livenet',
      port: 3001,
      services: [
        'siriusd',
        'web',
        'insight-api',
        'insight-ui'
      ],
      servicesConfig: {
        siriusd: {
          spawn: {
            datadir: process.env.HOME + '/.bitcore/data',
            exec: expectedExecPath
          }
        }
      }
    }, null, 2);
    var defaultConfig = proxyquire('../../lib/scaffold/default-config', {
      fs: {
        existsSync: sinon.stub().returns(false),
        writeFileSync: function(path, data) {
          path.should.equal(process.env.HOME + '/.bitcore/bitcore-node.json');
          data.should.equal(config);
        },
        readFileSync: function() {
          return config;
        }
      },
      mkdirp: {
        sync: sinon.stub()
      }
    });
    var home = process.env.HOME;
    var info = defaultConfig({
      additionalServices: ['insight-api', 'insight-ui']
    });
    info.path.should.equal(home + '/.bitcore');
    info.config.network.should.equal('livenet');
    info.config.port.should.equal(3001);
    info.config.services.should.deep.equal([
      'siriusd',
      'web',
      'insight-api',
      'insight-ui'
    ]);
    var siriusd = info.config.servicesConfig.siriusd;
    should.exist(siriusd);
      siriusd.spawn.datadir.should.equal(home + '/.sirius/data');
      siriusd.spawn.exec.should.equal(expectedExecPath);
  });
});
