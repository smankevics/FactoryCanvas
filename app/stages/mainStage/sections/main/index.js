'use strict';

var PIXI = require('pixi.js');

var viewManager = require('../../managers/ViewManager');

var Shop = require('./views/Shop');
var Inventory = require('./views/Inventory');
var Workbench = require('./views/Workbench');
var Factory = require('./views/Factory');
var Auction = require('./views/Auction');
var Stats = require('./views/Stats');

module.exports = function(_x, _y, _width, _height) {
  var x = _x;
  var y = _y;
  var width = _width;
  var height = _height;
  var container = new PIXI.Container();

  container.x = x;
  container.y = y;
  container.width = width;
  container.height = height;

  var shop = new Shop(width, height);
  var inventory = new Inventory(width, height);
  var workbench = new Workbench(width, height);
  var factory = new Factory(width, height);
  var auction = new Auction(width, height);
  var stats = new Stats(width, height);

  viewManager.addView('shop', shop);
  viewManager.addView('inventory', inventory);
  viewManager.addView('workbench', workbench);
  viewManager.addView('factory', factory);
  viewManager.addView('auction', auction);
  viewManager.addView('stats', stats);

  container.addChild(shop);
  container.addChild(inventory);
  container.addChild(workbench);
  container.addChild(factory);
  container.addChild(auction);
  container.addChild(stats);

  viewManager.setView('shop');

  return container;
}