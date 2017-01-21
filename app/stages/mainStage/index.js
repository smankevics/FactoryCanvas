'use strict';

var PIXI = require('pixi.js');

var Header = require('./sections/header');
var Navigation = require('./sections/navigation');
var Main = require('./sections/main');
var state = require('managers/StateManager');

const HEAD_HEIGHT = 40;
const NAV_HEIGHT = 30;

module.exports = function(_name, _width, _height) {
  var name = _name;
  var width = _width;
  var height = _height;
  
  var container = new PIXI.Container();
  container.visible = false;

  var header, navigation, main;

  function init() {
    header = new Header(0, 0, width, HEAD_HEIGHT);
    navigation = new Navigation(0, HEAD_HEIGHT, width, NAV_HEIGHT);
    main = new Main(0, navigation.y + navigation.height, width, height - (navigation.y + navigation.height));

    container.addChild(header);
    container.addChild(navigation);
    container.addChild(main);
  }

  init();

  state.listen('windowSize', function(size){
    width = size[0];
    height = size[1];
    init();
  }, container);

  return {
    name: name,
    container: container
  }
}