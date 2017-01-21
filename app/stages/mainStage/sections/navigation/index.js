'use strict';

var PIXI = require('pixi.js');

var Button = require('../../../../components/view/Button');

var viewManager = require('../../managers/ViewManager');
var state = require('managers/StateManager');

const COLOR = 0x000000;
const SELECTED_COLOR = 0xdedede;

module.exports = function(_x, _y, _width, _height) {
  var x = _x;
  var y = _y;
  var width = _width;
  var height = _height;
  var active = null;
  var initialState = state.get('selectedView') || 'shop';

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
  var buttons = {};

  function select(name, init) {
    var bt = buttons[name];
    if(active) {
      active.style.fill = COLOR;
      active.dirty = true;
    }

    if(!init)
      viewManager.setView(name);
    
    active = bt;
    active.style.fill = SELECTED_COLOR;
    active.dirty = true;
    state.set('selectedView', name);
  }

  var shop = new Button('Shop', 0, 0, COLOR, function() {
    select('shop');
  });
  buttons['shop'] = shop;

  var workbench = new Button('Workbench', shop.x + shop.width + 10, 0, COLOR, function() {
    select('workbench');
  });
  buttons['workbench'] = workbench;

  var inventory = new Button('Inventory', workbench.x + workbench.width + 10, 0, COLOR, function() {
    select('inventory');
  });
  buttons['inventory'] = inventory;

  var factory = new Button('Factory', inventory.x + inventory.width + 10, 0, COLOR, function() {
    select('factory');
  });
  buttons['factory'] = factory;

  var auction = new Button('Auction', factory.x + factory.width + 10, 0, COLOR, function() {
    select('auction');
  });
  buttons['auction'] = auction;

  var stats = new Button('Stats', auction.x + auction.width + 10, 0, COLOR, function() {
    select('stats');
  });
  buttons['stats'] = stats;

  select(initialState, true);
  

  group.addChild(shop);
  group.addChild(workbench);
  group.addChild(inventory);
  group.addChild(factory);
  group.addChild(auction);
  group.addChild(stats);

  group.x = (width - group.width) / 2; 
  group.y = (height - group.height) / 2; 

  container.addChild(group);

  return container;
}