'use strict';

var PIXI = require('pixi.js');

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

  var nav = new PIXI.Graphics();
  nav.beginFill(0x609191);
  nav.drawRect(0, 0, width, height);
  container.addChild(nav);

  return container;
}