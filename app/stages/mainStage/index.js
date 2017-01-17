'use strict';

var PIXI = require('pixi.js');

var Header = require('./sections/header');
var Navigation = require('./sections/navigation');
var Main = require('./sections/main');

const HEAD_HEIGHT = 40;
const NAV_HEIGHT = 30;

module.exports = function(_name, _width, _height) {
  var name = _name;
  var width = _width;
  var height = _height;
  var container = new PIXI.Container();

  //initially invisible 
  container.visible = false;

  var header = new Header(0, 0, width, HEAD_HEIGHT);
  var navigation = new Navigation(0, HEAD_HEIGHT, width, NAV_HEIGHT);
  var main = new Main(0, navigation.y + navigation.height, width, height - (navigation.y + navigation.height));

  container.addChild(header);
  container.addChild(navigation);
  container.addChild(main);

  return {
    name: name,
    container: container
  }
}