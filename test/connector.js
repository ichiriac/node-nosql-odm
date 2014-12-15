// this is an helper for creating a new session
var manager = require(process.cwd() + '/main');
var config = require(process.cwd() + '/test');
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