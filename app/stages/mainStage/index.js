'use strict';

var PIXI = require('pixi.js');

const HEAD_HEIGHT = 30;
const NAV_HEIGHT = 50;

module.exports = function(_name, _width, _height) {
  var name = _name;
  var width = _width;
  var height = _height;
  var container = new PIXI.Container();

  //initially invisible 
  container.visible = false;

  var head = new PIXI.Graphics();
  head.beginFill(0x25262B);
  head.drawRect(0, 0, width, HEAD_HEIGHT);
  container.addChild(head);

  var nav = new PIXI.Graphics();
  nav.beginFill(0x609191);
  nav.drawRect(0, HEAD_HEIGHT, width, NAV_HEIGHT);
  container.addChild(nav);

  var body = new PIXI.Graphics();
  body.beginFill(0xBCDBCC);
  body.drawRect(0, HEAD_HEIGHT + NAV_HEIGHT, width, height - HEAD_HEIGHT - NAV_HEIGHT);
  container.addChild(body);

  return {
    name: name,
    container: container
  }
}