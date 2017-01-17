'use strict';

var _ = require('lodash');

var store = require('../components/Store');
var emitter = require('event-emitter')();

module.exports = {
  set: function(key, value) {
    store[key] = value;
    emitter.emit(key, value);
  },
  add: function(key, value) {
    var old = this.get(key);
    if(typeof value === 'number' && typeof old === 'number') {
      store[key] = old + value;
      emitter.emit(key, store[key]);
    } else {
      throw 'Error: can sum only numbers!';
    }
  },
  substract: function(key, value) {
    var old = this.get(key);
    if(typeof value === 'number' && typeof old === 'number') {
      store[key] = old - value;
      emitter.emit(key, store[key]);
    } else {
      throw 'Error: can substract only numbers!';
    }
  },
  listen: function(key, cb) {
    emitter.on(key, cb);
  },
  get: function(key) {
    return store[key];
  }
}