var sys = require('sys');
var exec = require('child_process').exec;
var path = __dirname;

// executes mocha tests over mocha
exec(
  path + '/node_modules/istanbul/lib/cli.js cover '
  + path + '/node_modules/mocha/bin/_mocha --report lcovonly'
  + ' ' + path + '/test/'
  + ' -- -R spec -t 10000'
  , function (error, stdout, stderr) {
    sys.print('stdout: ' + stdout);
    sys.print('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      exec(
        'cat ' + path + '/coverage/lcov.info'
        + ' | node ' + path + '/node_modules/coveralls/bin/coveralls.js '
      );
    }
  }
);