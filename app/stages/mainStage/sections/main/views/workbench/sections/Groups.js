'use strict';

var PIXI = require('pixi.js');

var groups = require('./../../../../../../../defines/groups');

module.exports = function(_x, _y, _width, _height, onGroupChangeCb) {
  var x = _x;
  var y = _y;
  var width = _width;
  var height = _height;
  var container = new PIXI.Container();

  var selected;

  container.x = x;
  container.y = y;
  container.width = width;
  container.height = height;

  var bg = new PIXI.Graphics();
  bg.beginFill(0xbababa);
  bg.drawRect(0, 0, width, height);
  container.addChild(bg);

  var title = new PIXI.Text('Groups', {fontFamily : 'Calibri', fontSize: 16, fontWeight: 'bold', fill : 0x222222});
  title.x = (width - title.width) / 2;
  title.y = 5;
  container.addChild(title);

  var g, gBg, gy = 30;
  groups.forEach(function(group) {
    var gBg = new PIXI.Graphics();
    gBg.beginFill(0xbababa);
    gBg.drawRect(5, gy, width - 10, 20);
    gBg.groupId = group.id;
    gBg.buttonMode = true;
    gBg.interactive = true;
    gBg.on('mousedown', function(e) {
      var sameClick = selected == e.currentTarget;

      if(selected) {
        selected.graphicsData[0].fillColor = 0xbababa;
        selected.children[0].style.fill = 0x222222;
        selected.dirty = true;
        selected = null;
      }

      if(!sameClick) {
        selected = e.currentTarget;
        selected.graphicsData[0].fillColor = 0x323232;
        selected.children[0].style.fill = 0xcdcdcd;
        selected.dirty = true;
      }
      onGroupChangeCb(selected ? selected.groupId : null);
    })

    g = new PIXI.Text('• ' + group.name, {fontFamily : 'Calibri', fontSize: 14, fontWeight: 'bold', fill : 0x222222});
    g.x = 8;
    g.y = gy + ((20 - g.height) / 2);

    gy += g.height + 6;

    gBg.addChild(g);
    container.addChild(gBg);
  });

  return {
    width: container.width,
    container: container
  };
}