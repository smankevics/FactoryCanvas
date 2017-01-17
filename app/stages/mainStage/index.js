'use strict';

var PIXI = require('pixi.js');

var HeadView = require('./views/headView');
var NavView = require('./views/navView');
var MainView = require('./views/mainView');

const HEAD_HEIGHT = 40;
const NAV_HEIGHT = 30;

module.exports = function(_name, _width, _height) {
  var name = _name;
  var width = _width;
  var height = _height;
  var container = new PIXI.Container();

  //initially invisible 
  container.visible = false;

  var headView = new HeadView(0, 0, width, HEAD_HEIGHT);
  var navView = new NavView(0, HEAD_HEIGHT, width, NAV_HEIGHT);
  var mainView = new MainView(0, navView.y + navView.height, width, height - (navView.y + navView.height));

  container.addChild(headView);
  container.addChild(navView);
  container.addChild(mainView);

  return {
    name: name,
    container: container
  }
}