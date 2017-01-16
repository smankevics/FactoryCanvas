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

  var body = new PIXI.Graphics();
  body.beginFill(0xD7D7D8);
  body.drawRect(0, 0, width, height);
  container.addChild(body);

  return container;
}