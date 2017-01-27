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

  var tName = utils.wrapper(info.name, {width: 20});
  var name = new PIXI.Text(tName, {fontFamily : 'Calibri', fontSize: 12, fontWeight: 'bold', fill : 0x232323});
  name.x = 10;
  name.y = 0;
  container.addChild(name);

  var available = new PIXI.Text(' / ' + availableItems, {fontFamily : 'Calibri', fontSize: 12, fontWeight: 'bold', fill : 0x232323});
  available.x = width - 50;
  available.y = (name.height - available.height) / 2;
  container.addChild(available);

  var needed = new PIXI.Text(itemsToCraft, {fontFamily : 'Calibri', fontSize: 12, fontWeight: 'bold', fill : 0x232323});
  needed.x = available.x - needed.width;
  needed.y = (name.height - needed.height) / 2;
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
      available.x = width - 50;
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