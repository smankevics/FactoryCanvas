'use strict';
var PIXI = require('pixi.js');

var storeManager = require('managers/StoreManager');
var utils = require('utils');

module.exports = function(_info, container, quantityChangedCb, tickerChangedCb) {
  var info = _info;

  var buyCount = storeManager.get('toBuy[' + info.id + ']') || 0;
  var pressTimeout;
  var pressCycle = 1;

  function updateTicker(inc) {
    if(!inc && buyCount == 0)
      return;

    if(inc) 
      buyCount++;
    else
      buyCount--;

    storeManager.set('toBuy[' + info.id + ']', buyCount);
      
    if(buyCount > 0) {
      if(pressTimeout)
        clearTimeout(pressTimeout);
      pressTimeout = setTimeout(function(){updateTicker(inc)}, 200 / pressCycle);

      if(pressCycle < 10)
        pressCycle++;
    }
    updateTickerValue();
  }

  function updateTickerValue() {
    var value = buyCount > 0 ? ('+' + buyCount) : '';
    tickerChangedCb(value);
  }

  function releaseTicker() {
    clearTimeout(pressTimeout);
    pressCycle = 1;
  }

  function getQuantity() {
    return storeManager.get('inventory[' + info.id + ']');
  }

  //listen on shopping list clearance
  storeManager.listen('toBuy', function(shopList) {
    buyCount = shopList[info.id] ? shopList[info.id] : 0;
    updateTickerValue();
  }, container);

  storeManager.listen('inventory[' + info.id + ']', function(value) {
    quantityChangedCb(value + '');
  }, container);
  storeManager.listen('inventory', function(list) {
    quantityChangedCb(list[info.id] + '');
  }, container);

  return {
    updateTicker: updateTicker,
    releaseTicker: releaseTicker,
    getQuantity: getQuantity
  }
};