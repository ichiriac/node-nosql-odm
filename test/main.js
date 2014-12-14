var assert = require('assert');

var tests = function(driver) {
  var session;
  it('should connect to ' + driver, function(done) {
    require('./connector')(driver).then(function(api) {
      assert(typeof api.declare === 'function', 'should have declare function');
      assert(typeof api.get === 'function', 'should have get function');
      assert(typeof api.has === 'function', 'should have has function');
      assert(typeof api.connect === 'function', 'should have has function');
      assert(typeof api.cb === 'object', 'should have cb object');
      session = api;
      done();
    }).done();
  });
  it('should declare', function() {
    assert(session.declare('test', {}) instanceof Object, 'Should be an object');
  });
  it('should has', function() {
    assert(session.has('test'));
  });
  it('should not has', function() {
    assert(!session.has('something'));
  });
  it('should get', function() {
    assert(session.get('test') instanceof Object);
  });
  it('should get an error', function() {
    try {
      assert(session.get('something') && false);
    } catch(e) {
      assert(e instanceof Error);
    }
  });
  it('should get an error from declare', function() {
    try {
      assert(session.declare('test') && false);
    } catch(e) {
      assert(e instanceof Error);
    }
  });
  it('should not connect', function(done) {
    session.on('error', function(e) {
      done();
    });
    session.disconnect().then(function() {
      return session.connect(driver,
        driver == 'couchbase' ? {
          host: 'demo.123:8091'
          , bucket: 'unknown'
          , params : {
              mock: false
          }
        } : {
          host: 'demo.123:6379',
          database: 1
        }
      );
    }).then(function() {
      assert(false, 'should not be connected to "unknown" bucket / host !');
    }, function() {
      // ignore error from promise, use the event
      assert(true);
    }).done();
  });
};

// run tests on couchbase
describe('test main api (couchbase)', function() {
  tests('couchbase');
});

// run tests on redis
describe('test main api (redis)', function() {
  tests('redis');
});