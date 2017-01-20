'use strict';
var PIXI = require('pixi.js');

var storeManager = require('managers/StoreManager');
var Utils = require('../../../../../../utils');

module.exports = function(_info, container, quantityChangedCb, tickerChangedCb) {
  var info = _info;

  var sellCount = 0;
  var quantity = storeManager.get('inventory[' + info.id + ']');
  var pressTimeout;
  var pressCycle = 1;

  function updateTicker(inc) {
    var newValue = inc ? sellCount + 1 : sellCount - 1;

    if((!inc && sellCount <= 0) || (inc && sellCount >= quantity)) {
      clearTimeout(pressTimeout);
      return;
    }

    sellCount = newValue;
    storeManager.set('toSell[' + info.id + ']', sellCount);
      
    if(pressTimeout)
      clearTimeout(pressTimeout);
    pressTimeout = setTimeout(function(){updateTicker(inc)}, 200 / pressCycle);

    if(pressCycle < 10)
      pressCycle++;

    updateTickerValue();
  }

  function updateTickerValue() {
    var value = sellCount > 0 ? sellCount : '';
    tickerChangedCb(value);
  }

  function releaseTicker() {
    clearTimeout(pressTimeout);
    pressCycle = 1;
  }

  function getQuantity() {
    var quantity = storeManager.get('inventory[' + info.id + ']');
    return quantity;
  }

  //listen on shopping list clearance
  storeManager.listen('toSell', function(shopList) {
    sellCount = shopList[info.id] ? shopList[info.id] : 0;
    updateTickerValue();
  }, container);

  storeManager.listen('inventory[' + info.id + ']', function(value) {
    quantity = value;
    quantityChangedCb(value + '');
  }, container);
  storeManager.listen('inventory', function(list) {
    quantity = list[info.id];
    quantityChangedCb(quantity + '');
  }, container);

  return {
    updateTicker: updateTicker,
    releaseTicker: releaseTicker,
    getQuantity: getQuantity
  }
};