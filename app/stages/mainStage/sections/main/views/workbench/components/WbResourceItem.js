'use strict';
var PIXI = require('pixi.js');
var utils = require('utils');

const WIDTH = 65;
const HEIGHT = 70;
const COLOR = 0xbababa;
const SELECTED_COLOR = 0xcdcdcd;

module.exports = function(_info, selectCb) {
  var info = _info;
  var container = new PIXI.Container();
  container.buttonMode = true;
  container.interactive = true;
  container.on('mousedown', function() {
    selectCb(_info.id);
  })

  var bg = new PIXI.Graphics();
  bg.beginFill(0xbababa);
  bg.drawRoundedRect(0, 0, WIDTH, HEIGHT, 5);
  container.addChild(bg);

  var name = utils.Text(info.name, {fontFamily : 'Calibri', fontSize: 14, fontWeight: 'bold', fill : 0x232323});
  name.x = (WIDTH - name.width) / 2;
  name.y = 2;
  container.addChild(name);

  var iconBg = new PIXI.Graphics();
  iconBg.beginFill(0x444444);
  iconBg.drawRect(0, 0, 45, 45);
  iconBg.x = (WIDTH - 45) / 2;
  iconBg.y = name.y + name.height + 2;
  container.addChild(iconBg);

  if(!PIXI.loader.resources[info.name])
    throw new Error('Unable to find ' + info.name + ' texture');

  var icon = new PIXI.Sprite(PIXI.loader.resources[info.name].texture);
  icon.width = 34;
  icon.height = 34;
  icon.x = (WIDTH - icon.width) / 2;
  icon.y = iconBg.y + 6;
  container.addChild(icon);

  function select() {
    if(!bg)
      return;

    bg.graphicsData[0].fillColor = SELECTED_COLOR;
    bg.dirty = true;
  }

  function deselect() {
    if(!bg)
      return;

    bg.graphicsData[0].fillColor = COLOR;
    bg.dirty = true;
  }

  return {
    container: container,
    info: info,
    select: select,
    deselect: deselect
  }
};