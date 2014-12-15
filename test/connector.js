// this is an helper for creating a new session
try {
  var config = require(process.cwd() + '/config');
  var manager = require(process.cwd() + '/main');
} catch(e) {
  // inject sofa driver (mockup)
  var config = require('./sofa-odm/config');
  var manager = require('../main');
  var connect = manager.prototype.connect;
  manager.prototype.connect = function(options) {
    return connect.apply(this, [
      require('./sofa-odm/src/driver'), options
    ]);
  };
}



var session = new manager();
module.exports = function(mock) {
  session.mappers = {};
  session.removeAllListeners();
  return session.connect(
    config.host + '?mock=' + (
      (typeof mock === 'undefined' ? true : mock) ? 'true' : 'false'
    )
  );
};