'use strict';

var PIXI = require('pixi.js');

var resources = require('../../../../../defines').allItems();

var SellDecline = require('../components/SellDecline');
var ResourceItem = require('../components/ResourceItem');
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

  var title = new PIXI.Text('Inventory', {fontFamily : 'Calibri', fontSize: 24, fontWeight: 'bold', fill : 0x222222});
  title.x = (width - title.width) / 2;
  title.y = 5;
  container.addChild(title);

  // buy/decline section
  var sellDecline = new SellDecline();
  sellDecline.x = width - sellDecline.width;
  sellDecline.y = 5;
  container.addChild(sellDecline);

  var group = new ScrollableGroup(container, width, height);

  var i = 0, rw = 0, rh = 40;
  resources.forEach(function(resource) {
    var res = new ResourceItem(resource);
    res.container.x = rw;
    res.container.y = rh;
    rw += res.container.width + 8;
    if(rw + res.container.width > width) {
      rw = 0;
      rh += res.container.height + 8;
    }
    group.addChild(res.container);
    i++;
  });

  container.addChild(group.container);

  return container;
}