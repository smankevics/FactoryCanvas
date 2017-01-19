'use strict';

var _ = require('lodash');

var store = require('../components/Store');
var emitter = require('event-emitter')();

var utils = require('../utils');

const DEBUG = true;

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

function updateFrom(key, value, add) {
  if(value instanceof Array) {
      var initial = get(key);
      var ii, vv;
      for(var i = 0; i < value.length; i++) {
        ii = initial[i] ? initial[i] : 0;
        vv = value[i] ? value[i] : 0;
        if(add)
          initial[i] = ii + vv;
        else
          initial[i] = ii - vv;
      }
      set(key, initial);
    } else {
      throw 'Error: can\'t update from given type!';
    }
}

module.exports = {
  set: set,
  get: get,
  add: function(key, value) {
    var old = this.get(key);
    if(!old || old < 0)
      old = 0;
    if(typeof old === 'string')
      old = Number(old);
    if(typeof value === 'number') {
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
      _.set(store, key, utils.numberCurrency(newValue));
      emit(key, store[key]);
    } else {
      throw 'Error: can substract only numbers!';
    }
  },
  addFrom: function(key, value) {
    updateFrom(key, value, true);
  },
  substractFrom: function(key, value) {
    updateFrom(key, value);
  },
  listen: function(key, cb) {
    log('listen', key);
    emitter.on(key, cb);
  }
}