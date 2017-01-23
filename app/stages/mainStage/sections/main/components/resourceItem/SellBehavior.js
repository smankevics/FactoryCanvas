'use strict';
var PIXI = require('pixi.js');

var storeManager = require('managers/StoreManager');
var utils = require('utils');

module.exports = function(_info, container, quantityChangedCb, sellResetCb) {
  var info = _info;

  function getQuantity() {
    return storeManager.get('inventory[' + info.id + ']');
  }

  function getTickerValue() {
    return storeManager.get('toSell[' + info.id + ']');
  }

  function setTickerValue(value) {
    storeManager.set('toSell[' + info.id + ']', value);
  }

  //listen on shopping list clearance
  storeManager.listen('toSell[' + info.id + ']', function(value) {
    if(!value) {
      sellResetCb();
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