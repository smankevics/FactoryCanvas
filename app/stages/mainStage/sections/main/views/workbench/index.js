'use strict';

var PIXI = require('pixi.js');
var utils = require('utils');

var Groups = require('./sections/Groups');
var Materials = require('./sections/Materials');
var Craft = require('./sections/Craft');

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

  var title = new PIXI.Text('Мастерская', {fontFamily : 'Calibri', fontSize: 24, fontWeight: 'bold', fill : 0x222222});
  title.x = 10;
  title.y = 5;
  container.addChild(title);

  var groups = new Groups(5, 40, 240, height - 45, onGroupChange);
  var craft = new Craft(width - 205, 40, 200, height - 45);
  var materials = new Materials(groups.width + 10, 40, width - groups.width - craft.width - 20, height - 45, onMaterialSelect);

  function onGroupChange(group) {
    materials.setGroup(group);
  }
  function onMaterialSelect(material) {
    craft.setMaterial(material);
  }

  container.addChild(groups.container);
  container.addChild(materials.container);
  container.addChild(craft.container);

  return container;
}