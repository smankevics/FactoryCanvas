'use strict';

var _ = require('lodash');

var store = require('../components/Store');
var emitter = require('event-emitter')();

function set(key, value) {
    _.set(store, key, value);
    emit(key, value);
  }

function get(key) {
  return _.get(store, key);
}

function emit(key, value) {
  //emit item change
  emitter.emit(key, value);
  //emit object change
  if(key.indexOf('[') > -1) {
    var oKey = key.split('[')[0];
    emitter.emit(oKey, get(oKey));
  }
}

module.exports = {
  set: set,
  get: get,
  add: function(key, value) {
    var old = this.get(key);
    if(typeof value === 'number' && typeof old === 'number') {
      var newValue = old + value;
      _.set(store, key, newValue);
      emit(key, newValue);
    } else {
      throw 'Error: can sum only numbers!';
    }
  },
  substract: function(key, value) {
    var old = this.get(key);
    if(typeof value === 'number' && typeof old === 'number') {
      var newValue = old - value;
      _.set(store, key, newValue);
      emit(key, store[key]);
    } else {
      throw 'Error: can substract only numbers!';
    }
  },
  updateFrom: function(key, value) {
    if(value instanceof Array) {
      var initial = get(key);
      for(var i = 0; i < value.length; i++) {
        initial[i] += value[i];
      }
      set(key, initial);
    } else {
      throw 'Error: can\'t update from given type!';
    }
  },
  listen: function(key, cb) {
    emitter.on(key, cb);
  }
}