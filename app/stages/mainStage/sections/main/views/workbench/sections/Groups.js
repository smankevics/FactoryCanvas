'use strict';

var PIXI = require('pixi.js');
var utils = require('utils');

var groups = require('defines/groups');
var state = require('managers/StateManager');

const BG = 0xbababa;
const SELECTED_BG = 0x323232;
const FONT = 0x222222;
const SELECTED_FONT = 0xcdcdcd;

module.exports = function(_x, _y, _width, _height, onGroupChangeCb) {
  var x = _x;
  var y = _y;
  var width = _width;
  var height = _height;
  var container = new PIXI.Container();

  var selected;
  var initialSelectedId = state.get('workbench.selectedGroup');

  container.x = x;
  container.y = y;
  container.width = width;
  container.height = height;

  var bg = new PIXI.Graphics();
  bg.beginFill(0xbababa);
  bg.drawRect(0, 0, width, height);
  container.addChild(bg);

  var title = utils.Text('Groups', {fontFamily : 'Calibri', fontSize: 16, fontWeight: 'bold', fill : 0x222222});
  title.x = (width - title.width) / 2;
  title.y = 5;
  container.addChild(title);

  function onClick(e) {
    var sameClick = selected == e.currentTarget;

    if(selected) {
      selected.graphicsData[0].fillColor = BG;
      selected.children[0].style.fill = FONT;
      selected.dirty = true;
      selected = null;
    }

    if(!sameClick) {
      selected = e.currentTarget;
      selected.graphicsData[0].fillColor = SELECTED_BG;
      selected.children[0].style.fill = SELECTED_FONT;
      selected.dirty = true;
    }
    var s = selected ? selected.groupId : null;
    state.set('workbench.selectedGroup', s)
    onGroupChangeCb(s);
  }

  var g, gBg, gy = 30, isSelected, font;
  groups.forEach(function(group) {
    var gBg = new PIXI.Graphics();
    isSelected = initialSelectedId == group.id;
    gBg.beginFill(isSelected ? SELECTED_BG : BG);
    gBg.drawRect(5, gy, width - 10, 20);
    gBg.groupId = group.id;
    gBg.buttonMode = true;
    gBg.interactive = true;
    gBg.on('mousedown', onClick);
    gBg.on('tap', onClick);    

    font = isSelected ? SELECTED_FONT : FONT;
    g = utils.Text('• ' + group.name, {fontFamily : 'Calibri', fontSize: 14, fontWeight: 'bold', fill : font});
    g.x = 8;
    g.y = gy + ((20 - g.height) / 2);

    gy += g.height + 6;
      
    gBg.addChild(g);

    if(isSelected)
      selected = gBg;

    container.addChild(gBg);
  });

  return {
    width: container.width,
    container: container
  };
}