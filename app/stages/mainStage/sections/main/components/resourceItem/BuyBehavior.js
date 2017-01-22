'use strict';
var PIXI = require('pixi.js');

var storeManager = require('managers/StoreManager');
var utils = require('utils');

module.exports = function(_info, container, quantityChangedCb, buyResetCb) {
  var info = _info;

  function getQuantity() {
    return storeManager.get('inventory[' + info.id + ']');
  }

  function getTickerValue() {
    return storeManager.get('toBuy[' + info.id + ']');
  }

  function setTickerValue(value) {
    storeManager.set('toBuy[' + info.id + ']', value);
  }

  //listen on shopping list clearance
  storeManager.listen('toBuy[' + info.id + ']', function(value) {
    if(!value) {
      buyResetCb();
      console.log('clear ', info.name);
    }
  }, container);

  storeManager.listen('inventory[' + info.id + ']', function(value) {
    quantityChangedCb(value);
  }, container);

  return {
    getQuantity: getQuantity,
    getTickerValue: getTickerValue,
    setTickerValue: setTickerValue
  }
};