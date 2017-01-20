'use strict';

var PIXI = require('pixi.js');
var utils = require('utils');

module.exports = function(_name, _width, _height) {
  var name = _name;
  var width = _width;
  var height = _height;
  var container = new PIXI.Container();

  //initially invisible 
  container.visible = false;

  var bg = new PIXI.Graphics();
  bg.beginFill(0x232323);
  bg.drawRect(0, 0, width, height);
  container.addChild(bg);

  var loading = utils.Text('Loading...', {fontFamily : 'Calibri', fontSize: 36, fontWeight: 'bold', fill : 0xededed});
  loading.x = (width - loading.width) / 2;
  loading.y = (height - loading.height) / 2;
  container.addChild(loading);

  return {
    name: name,
    container: container
  }
}