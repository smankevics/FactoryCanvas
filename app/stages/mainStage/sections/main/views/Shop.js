'use strict';

var PIXI = require('pixi.js');

var commonResources = require('../../../../../defines').commonResources;
var utils = require('utils');

var BuyDecline = require('../components/BuyDecline');
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

  var title = new PIXI.Text('Магазин', {fontFamily : 'Calibri', fontSize: 24, fontWeight: 'bold', fill : 0x222222});
  title.x = 10;
  title.y = 5;
  container.addChild(title);

  // buy/decline section
  var buyDecline = new BuyDecline();
  buyDecline.x = width - buyDecline.width;
  buyDecline.y = 5;
  container.addChild(buyDecline);

  var res;
  commonResources.forEach(function(resource) {
    res = scrollable.packItem(new ResourceItem(resource, 'buy'));
    scrollable.addItem(res);
  });
  scrollable.reposition();

  return container;
}