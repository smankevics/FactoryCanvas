'use strict';
var PIXI = require('pixi.js');

var defines = require('defines');
var utils = require('utils');
var storeManager = require('managers/StoreManager');

const GREEN = 0x32995E;
const RED = 0x993232;

module.exports = function(_y, _width, _id, _neededForCraft, initialItemsToCraft) {
  var y = _y;
  var width = _width;
  var info = defines.allItems[_id];
  var neededForCraft = _neededForCraft;
  var itemsToCraft = initialItemsToCraft || 0;

  var container = new PIXI.Container();
  container.x = 0;
  container.y = _y;
  container.width = width;

  var availableItems = storeManager.get('inventory[' + info.id + ']');
  storeManager.listen('inventory', inventoryUpdateCb, container);

  function inventoryUpdateCb(list) {
    updateAvailableItems(list[_id]);
  }

  var name = utils.Text(info.name, {fontFamily : 'Calibri', fontSize: 14, fontWeight: 'bold', fill : 0x232323});
  name.x = 20;
  name.y = 0;
  container.addChild(name);

  var available = utils.Text(' / ' + availableItems, {fontFamily : 'Calibri', fontSize: 14, fontWeight: 'bold', fill : 0x232323});
  available.x = width - 60;
  available.y = 0;
  container.addChild(available);

  var needed = utils.Text(itemsToCraft, {fontFamily : 'Calibri', fontSize: 14, fontWeight: 'bold', fill : 0x232323});
  needed.x = available.x - needed.width;
  needed.y = 0;
  container.addChild(needed);

  function updateIemsToCraftColor() {
    if(enoughToCraft()) {
      needed.style.fill = 0x232323;
    } else {
      needed.style.fill = 0x993232;
    }
    needed.dirty = true;
  }

  function updateAvailableItems(_number) {
    availableItems = _number;
    if(available.transform) {
      available.text = ' / ' + availableItems;
      available.x = width - 60;
      updateIemsToCraftColor();
    }
  }

  function updateIemsToCraft(_number) {
    itemsToCraft = utils.numberCurrency(_number * neededForCraft);
    if(needed.transform) {
      needed.text = itemsToCraft;
      needed.x = available.x - needed.width;
      updateIemsToCraftColor();
    }
  }

  function enoughToCraft() {
    return itemsToCraft <= availableItems;
  }

  function getValue() {
    return itemsToCraft;
  }

  return {
    container: container,
    info: info,
    updateIemsToCraft: updateIemsToCraft,
    getValue: getValue,
    enoughToCraft: enoughToCraft
  }
};