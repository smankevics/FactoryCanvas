'use strict';

var Scene = require('./components/scene.js');

module.exports = function() {
  var scenes = [];

  return {
    addScene: function(_scene) {
      scenes.push(new Scene(_scene));
    }  
  }
};