'use strict';

var PIXI = require('pixi.js');

var HeadView = require('./views/headView');
var NavView = require('./views/navView');
var MainView = require('./views/mainView');

const HEAD_HEIGHT = 30;
const NAV_HEIGHT = 50;

module.exports = function(_name, _width, _height) {
  var name = _name;
  var width = _width;
  var height = _height;
  var container = new PIXI.Container();

  //initially invisible 
  container.visible = false;

  container.addChild(new HeadView(0, 0, width, HEAD_HEIGHT));
  container.addChild(new NavView(0, HEAD_HEIGHT, width, NAV_HEIGHT));
  container.addChild(new MainView(0, HEAD_HEIGHT + NAV_HEIGHT, width, height - HEAD_HEIGHT - NAV_HEIGHT));

  return {
    name: name,
    container: container
  }
}