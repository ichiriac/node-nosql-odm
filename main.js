var q = require('q');
var extend = require('extend');
var util = require('util');
var url = require('url');
var EventEmitter = require('events').EventEmitter;

/**
 * The manager class
 */
var manager = function(options) {
  // parent constructor call
  EventEmitter.call(this);
  // Handles default options
  this.options = extend(true,
      {
        // list of behaviour handlers
        behaviours: ['index', 'required', 'unique'],
        // list of property types validators
        validators: {
          'string': 'string',
          'number': 'number',
          'object': 'object',
          'date': 'date',
          'boolean': 'boolean',
          'array': 'array'
        },
      }, options || {}
  );
  // registers behaviours
  for(var i = 0; i < this.options.behaviours.length; i++) {
    var behaviour = this.options.behaviours[i];
    if (typeof behaviour === 'string') {
      this.options.behaviours[i] = require(
        behaviour[0] == '.' || behaviour[0] == '/' ?
          behaviour : __dirname + '/src/behaviours/' + behaviour
      );
    }
  }
  // register validators
  for(var i in this.options.validators) {
    var validator = this.options.validators[i];
    if (typeof validator === 'string') {
      this.options.validators[i] = require(
        validator[0] == '.' || validator[0] == '/' ?
          validator : __dirname + '/src/validators/' + validator
      )(this);
    }
  }
  // registers events
  if (this.options.hasOwnProperty('on')) {
    for(var event in this.options.on) {
      this.on(event, this.options.on[event]);
    }
  }
  this.on('disconnect', function(manager) {
    manager.cb = null;
  });
  // connects to couchbase
  if (this.options.hasOwnProperty('couchbase')) {
    this.connect(this.options.couchbase).done();
  }
  // factories
  this.factory = {
    mapper:     require(__dirname + '/src/mapper')(this),
    view:       require(__dirname + '/src/view')(this),
    record:     require(__dirname + '/src/record'),
    resultset:  require(__dirname + '/src/resultset'),
    property:   require(__dirname + '/src/property'),
    property:   require(__dirname + '/src/property')
  };
  // declare registered mappers
  this.mappers = {};
  if(this.options.hasOwnProperty('mappers')) {
    for(var name in this.options.mappers) {
      this.declare(name, this.options.mappers[name]);
    }
  }
};
util.inherits(manager, EventEmitter);

/**
 * Connects to couchbase
 */
manager.prototype.connect = function(driver, options) {
  var result = q.defer();
  if (typeof options === 'string') {
    var meta = url.parse(options, true, true);
    options = {
      host: meta.host,
      database: meta.pathname,
      params: meta.query
    };
  }
  if (this.cb) this.disconnect();
  this.cb = driver(this);
  this.cb.connect(options, result);
  return result.promise;
};

/**
 * Disconnects from the current session
 */
manager.prototype.disconnect = function() {
  var result = q.defer();
  if (this.cb) {
    this.cb.shutdown(result);
  } else {
    result.resolve(this);
  }
  return result.promise;
};

/**
 * Declare a new mapper
 */
manager.prototype.declare = function(namespace, options) {
  if (this.mappers.hasOwnProperty(namespace)) {
    throw new Error(
      'Namespace [' + namespace + '] is already defined !'
    );
  }
  return new this.factory.mapper(namespace, options);
};

/**
 * Gets a mapper
 */
manager.prototype.get = function(namespace) {
  if (!this.mappers.hasOwnProperty(namespace)) {
    throw new Error('Namespace [' + namespace + '] is undefined !');
  }
  return this.mappers[namespace];
};

/**
 * Checks if the mapper is defined
 */
manager.prototype.has = function(namespace) {
  return this.mappers.hasOwnProperty(namespace);
};

module.exports = manager;