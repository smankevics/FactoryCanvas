'use strict';

var Utils = require('./utils');
var ComponentsManager = require('./componentsManager');
var ScenesManager = require('./scenesManager');

module.exports = function(_x, _y, _width, _height) {
  var x = _x;
  var y = _y;
  var width = _width;
  var height = _height;

  var componentsManager = new ComponentsManager();
  var scenesManager = new ScenesManager();

  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext("2d");
  document.body.insertBefore(canvas, document.body.childNodes[0]);

  function process(fps) {
    Utils.drawUtils.clearRect(ctx, width, height);
    componentsManager.renderComponents();
    console.log(fps);
  }

  var dt = new Utils.DeltaTimer(process, 60);
  dt.start();

  return {
    addScene: scenesManager.addScene,
    addComponent: componentsManager.addComponent
  }
};