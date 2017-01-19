'use strict';
var PIXI = require('pixi.js');

var defines = require('defines');
var utils = require('utils');
var storeManager = require('managers/StoreManager');

module.exports = function(_y, _width, _id, _neededForCraft) {
  var y = _y;
  var width = _width;
  var info = defines.allItems[_id];
  var neededForCraft = _neededForCraft;

  var availableItems = storeManager.get('inventory[' + info.id + ']');
  storeManager.listen('inventory', function(list) {
    updateAvailableItems(list[_id]);
  });

  var itemsToCraft = 0;
  var container = new PIXI.Container();
  container.x = 0;
  container.y = _y;
  container.width = width;

  var name = new PIXI.Text(info.name, {fontFamily : 'Calibri', fontSize: 14, fontWeight: 'bold', fill : 0x232323});
  name.x = 15;
  name.y = 0;
  container.addChild(name);

  var available = new PIXI.Text(availableItems + '', {fontFamily : 'Calibri', fontSize: 14, fontWeight: 'bold', fill : 0x232323});
  available.x = width - 60;
  available.y = 0;
  container.addChild(available);

  var needed = new PIXI.Text(itemsToCraft + ' / ', {fontFamily : 'Calibri', fontSize: 14, fontWeight: 'bold', fill : 0x232323});
  needed.x = available.x - needed.width;
  needed.y = 0;
  container.addChild(needed);

  function updateAvailableItems(_number) {
    availableItems = _number;
    available.text = availableItems + '';
    available.x = width - 60;
  }

  function updateIemsToCraft(_number) {
    itemsToCraft = utils.numberCurrency(_number * neededForCraft);
    needed.text = itemsToCraft + '';
    needed.x = available.x - needed.width;
  }

  return {
    container: container,
    itemsToCraft: itemsToCraft
  }
};