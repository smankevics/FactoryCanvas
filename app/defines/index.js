'use strict';

var PIXI = require('pixi.js');

var _ = require('lodash');
var resources = require('./resources');

module.exports = {
  loadResources: function(cb) {
    var started = new Date;
    var promise = PIXI.loader;
    resources.forEach(function(r) {
      if(r.icon) {
        promise = promise.add(r.name, r.icon)
      }
    });
    promise
      .once('complete', function(loader, resources) {
        console.log(arguments);
        //loading screen should be displayed at least 500ms 
        var finished = new Date;
        var dif = finished - started;
        if(dif < 500)
          setTimeout(cb, 500 - dif)
        else
          cb();			
      })
      .load();
  },
  commonResources: function() {
    return _.filter(resources, {level: 1});
  },
  allItems: function() {
    resources.forEach(function(r) {
      if(!r.price) {
        r.price = 0;
        r.recipe.forEach(function(o) {
          r.price += resources[o[0]].price * o[1];
        });
        r.price = Math.round(r.price * 100) / 100;
      }
    });
    return resources;
  }
}