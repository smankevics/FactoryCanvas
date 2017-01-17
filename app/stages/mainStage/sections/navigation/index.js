'use strict';

var PIXI = require('pixi.js');

var Button = require('../../../../components').Button;

var viewManager = require('../../managers/ViewManager');

const COLOR = 0x000000;
const SELECTED_COLOR = 0xdedede;

module.exports = function(_x, _y, _width, _height) {
  var x = _x;
  var y = _y;
  var width = _width;
  var height = _height;
  var active = null;

  var container = new PIXI.Container();
  container.x = x;
  container.y = y;
  container.width = width;
  container.height = height;

  var bg = new PIXI.Graphics();
  bg.beginFill(0x6C6D70);
  bg.drawRect(0, 0, width, height);
  container.addChild(bg);

  var group = new PIXI.Container();

  function select(name, bt) {
    if(active) {
      active.style.fill = COLOR;
      active.dirty = true;
    }

    viewManager.setView(name);
    active = bt;
    active.style.fill = SELECTED_COLOR;
    active.dirty = true;
  }

  var shop = new Button('Shop', 0, 0, SELECTED_COLOR, function() {
    select('shop', shop);
  });
  active = shop;

  var inventory = new Button('Inventory', shop.x + shop.width + 10, 0, COLOR, function() {
    select('inventory', inventory);
  });

  var workbench = new Button('Workbench', inventory.x + inventory.width + 10, 0, COLOR, function() {
    select('workbench', workbench);
  });

  var factory = new Button('Factory', workbench.x + workbench.width + 10, 0, COLOR, function() {
    select('factory', factory);
  });

  var auction = new Button('Auction', factory.x + factory.width + 10, 0, COLOR, function() {
    select('auction', auction);
  });

  var stats = new Button('Stats', auction.x + auction.width + 10, 0, COLOR, function() {
    select('stats', stats);
  });

  group.addChild(shop);
  group.addChild(inventory);
  group.addChild(workbench);
  group.addChild(factory);
  group.addChild(auction);
  group.addChild(stats);

  group.x = (width - group.width) / 2; 
  group.y = (height - group.height) / 2; 

  container.addChild(group);

  return container;
}