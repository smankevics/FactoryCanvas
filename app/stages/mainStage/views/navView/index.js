'use strict';

var PIXI = require('pixi.js');

var Button = require('../../../../components').Button;

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

  var bg = new PIXI.Graphics();
  bg.beginFill(0x6C6D70);
  bg.drawRect(0, 0, width, height);
  container.addChild(bg);

  var group = new PIXI.Container();

  var shop = new Button('Shop', 0, 0, null, function() {
    
  }, function() {
    
  });

  var inventory = new Button('Inventory', shop.x + shop.width + 10, 0, null, function() {
    
  }, function() {
    
  });

  var workbench = new Button('Workbench', inventory.x + inventory.width + 10, 0, null, function() {
    
  }, function() {
    
  });

  var factory = new Button('Factory', workbench.x + workbench.width + 10, 0, null, function() {
    
  }, function() {
    
  });

  var auction = new Button('Auction', factory.x + factory.width + 10, 0, null, function() {
    
  }, function() {
    
  });

  var stats = new Button('Stats', auction.x + auction.width + 10, 0, null, function() {
    
  }, function() {
    
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