'use strict';

var PIXI = require('pixi.js');

var resources = require('../../../../../defines').allItems;
var utils = require('utils');

var SellDecline = require('../components/SellDecline');
var ResourceItem = require('../components/resourceItem');
var ScrollableGroup = require('../components/ScrollableGroup');

module.exports = function(_width, _height) {
  var width = _width;
  var height = _height;
  var container = new PIXI.Container();

  container.visible = false;
  container.width = width;
  container.height = height;

  var bg = new PIXI.Graphics();
  bg.beginFill(0xD7D7D8);
  bg.drawRect(0, 0, width, height);
  container.addChild(bg);

  var scrollable = ScrollableGroup(width, height - 40);
  scrollable.y = 40;
  container.addChild(scrollable);

  var title = new PIXI.Text('Склад', {fontFamily : 'Calibri', fontSize: 24, fontWeight: 'bold', fill : 0x222222});
  title.x = 10;
  title.y = 5;
  container.addChild(title);

  // sell/decline section
  var sellDecline = new SellDecline();
  sellDecline.x = width - sellDecline.width;
  sellDecline.y = 5;
  container.addChild(sellDecline);

  var res;
  resources.forEach(function(resource) {
    res = scrollable.packItem(new ResourceItem(resource, 'sell'));
    scrollable.addItem(res);
  });
  scrollable.reposition();

  return container;
}