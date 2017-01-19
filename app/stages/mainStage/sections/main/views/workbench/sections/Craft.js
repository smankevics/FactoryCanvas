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

  var bg = new PIXI.Graphics();
  bg.beginFill(0xbababa);
  bg.drawRect(0, 0, width, height);
  container.addChild(bg);

  var title = new PIXI.Text('Craft', {fontFamily : 'Calibri', fontSize: 16, fontWeight: 'bold', fill : 0x222222});
  title.x = (width - title.width) / 2;
  title.y = 5;
  container.addChild(title);

  return container;
}