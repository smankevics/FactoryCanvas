'use strict';

var PIXI = require('pixi.js');

var defines = require('../../../../../../../defines');

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

  var icon;

  var bg = new PIXI.Graphics();
  bg.beginFill(0xbababa);
  bg.drawRect(0, 0, width, height);
  container.addChild(bg);

  var name = new PIXI.Text('', {fontFamily : 'Calibri', fontSize: 16, fontWeight: 'bold', fill : 0x222222});
  name.x = (width - name.width) / 2;
  name.y = 140;
  container.addChild(name);

  function setMaterial(itemId) {
    if(icon)
      icon.destroy();

    var item = defines.getItemById(itemId);

    icon = new PIXI.Sprite(PIXI.loader.resources[item.name].texture);
    icon.width = 128;
    icon.height = 128;
    icon.x = (width - icon.width) / 2;
    icon.y = 10;

    name.text = item.name;
    name.x = (width - name.width) / 2;

    container.addChild(icon);
  }

  return {
    width: container.width,
    container: container,
    setMaterial: setMaterial
  };
}