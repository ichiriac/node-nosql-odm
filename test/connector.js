// this is an helper for creating a new session
try {
  var config = require(process.cwd() + '/config');
  var manager = require(process.cwd() + '/main');
} catch(e) {
  var config = require(process.cwd() + '/node_modules/sofa-odm/config');
  var manager = require(process.cwd() + '/node_modules/sofa-odm/main');
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