// this is an helper for creating a new session
var sofa = require('../main');
var session = new sofa();
module.exports = function(driver, mock) {
  session.mappers = {};
  session.removeAllListeners();
  var url = '';
  if (driver == 'redis') {
    url = 'redis://localhost:6379/1';
  } else {
    url = 'couchbase://localhost:8091/tests';
  }
  return session.connect(
    url + '?mock=' + (
      (typeof mock === 'undefined' ? true : mock) ? 'true' : 'false'
    )
  );
};