'use strict';

var PIXI = require('pixi.js');
var utils = require('utils');

module.exports = function(_x, _y) {
  const PERIOD = 1000;

  var container = new PIXI.Container();
  container.x = _x;
  container.y = _y;

  var lastLoop = new Date;
  var lastSnapshot = 0;

  var fps = utils.Text('', {fontFamily : 'Calibri', fontSize: 18, fontWeight: 'bold', fill : 0xff0000});
  container.addChild(fps);

  function update() { 
      var thisLoop = new Date;
      if(thisLoop - lastSnapshot > PERIOD) {
        fps.text = Math.round(1000 / (thisLoop - lastLoop));
        lastSnapshot = thisLoop;
      }
      lastLoop = thisLoop;
  }

  return {
    container: container,
    update: update
  }
};