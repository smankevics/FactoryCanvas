'use strict';

var _ = require('lodash');
var events = require('events');

const DEBUG = false;

var store = {};
var emitter = new events.EventEmitter();
emitter.setMaxListeners(0);

function log(action, val1, val2) {
  if(DEBUG) {
    val1 = val1 ? val1 : '';
    val2 = val2 ? val2 : '';
    console.log(action, val1, val2);
  }
}

function set(key, value) {
    _.set(store, key, value);
    emit(key, value);
  }

function get(key) {
  var value = _.get(store, key);
  log('get', key, value);
  return value;
}

function emit(key, value, preventGlobal) {
  log('emit', key, value);
  //emit item change
  emitter.emit(key, value);
  //emit object change
  if(key.indexOf('[') > -1 && !preventGlobal) {
    var oKey = key.split('[')[0];
    var val2 = get(oKey); 
    log('emit', oKey, val2);
    emitter.emit(oKey, val2);
  }
}

module.exports = {
  set: set,
  get: get,
  listen: function(key, cb, container) {
    var fn = cb;
    cb = function(value) {
      if(container && !container.transform) {
        log('remove listener', key);
        emitter.removeListener(key, cb);
      } else {
        fn.apply(this, arguments);
      }
    }
    log('listen', key);
    emitter.on(key, cb);
  },
  removeListener: function(key, cb) {
    log('remove listener', key);
    emitter.removeListener(key, cb);
  }
}