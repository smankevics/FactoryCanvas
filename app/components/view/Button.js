'use strict';

var PIXI = require('pixi.js');

var utils = require('utils');

module.exports = function (_text, _x, _y, _color, _mouseDownCb, _mouseUpCb) {
  var color = _color || 0x000000;
  var bt = utils.Text(_text, {fontFamily : 'Calibri', fontSize: 14, fontWeight: 'bold', fill : color});
  bt.buttonMode = true;
  bt.interactive = true;
  bt.x = _x;
  bt.y = _y;
  bt.on('mousedown', _mouseDownCb);
  bt.on('mouseup', _mouseUpCb);
  bt.on('touchstart', _mouseDownCb);
  bt.on('touchend', _mouseUpCb);
  return bt;
}