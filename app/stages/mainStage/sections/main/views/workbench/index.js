'use strict';

var PIXI = require('pixi.js');

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

  var title = new PIXI.Text('Workbench', {fontFamily : 'Calibri', fontSize: 24, fontWeight: 'bold', fill : 0x222222});
  title.x = 10;
  title.y = 5;
  container.addChild(title);

  var groups = new Groups(5, 40, 140, height - 45);
  var craft = new Craft(width - 205, 40, 200, height - 45);
  var materials = new Materials(150, 40, width - groups.width - craft.width - 20, height - 45);

  container.addChild(groups);
  container.addChild(materials);
  container.addChild(craft);

  return container;
}