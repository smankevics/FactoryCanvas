'use strict';

var PIXI = require('pixi.js');
var utils = require('utils');

var state = require('managers/StateManager');

module.exports = function(_width, _height) {
  const PERIOD = 1000;
  var width = _width;
  var height = _height;
  var container = new PIXI.Container();
  container.x = width - 5;
  container.y = height - 5;

  var lastLoop = new Date;
  var lastSnapshot = 0;

  var fps = new PIXI.Text('', {fontFamily : 'Calibri', fontSize: 18, fontWeight: 'bold', fill : 0xff0000});
  container.addChild(fps);

  state.listen('windowSize', function(size) {
    width = size[0];
    height = size[1];
    updatePosition();
  }, container);

  function update() { 
      var thisLoop = new Date;
      if(thisLoop - lastSnapshot > PERIOD) {
        fps.text = Math.round(1000 / (thisLoop - lastLoop));
        lastSnapshot = thisLoop;
      }
      lastLoop = thisLoop;
      updatePosition();
  }

  function updatePosition() {
    container.x = width - container.width - 5;
    container.y = height - container.height - 5;
  }

  return {
    container: container,
    update: update
  }
};