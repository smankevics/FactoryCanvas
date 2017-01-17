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

  var head = new PIXI.Graphics();
  head.beginFill(0x25262B);
  head.drawRect(0, 0, width, height);
  container.addChild(head);

  return container;
}