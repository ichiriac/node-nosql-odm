var sys = require('sys');
var exec = require('child_process').exec;
var path = __dirname;

// executes mocha tests over mocha
exec(
  path + '/node_modules/istanbul/lib/cli.js cover '
  + path + '/node_modules/mocha/bin/_mocha '
  + ' ' + path + '/test/'
  + ' -- -R spec -t 10000'
  , function (error, stdout, stderr) {
    sys.print(stdout);
    sys.print(stderr);
    exec(
      'cat ' + process.cwd() + '/coverage/lcov.info'
      + ' | node ' + path + '/node_modules/coveralls/bin/coveralls.js ',
      function(error, stdout, stderr) {
        sys.print(stdout);
        sys.print(stderr);
      }
    );
  }
);