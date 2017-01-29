'use strict';

var PIXI = require('pixi.js');
var _ = require('lodash');

var groups = require('./groups');
var images = require('./images');
var resources = require('./resources');

var commonResources = _.filter(resources, {level: 1});
var craftableItems = _.filter(resources, function(o) { return o.level !== 1 });

function calculateUnsetPrices(prevUnsetCount, force) {
  var unsetCount = 0, p, it;
  allItems.forEach(function (r, i) {
    if(!r.price && r.recipe) {
      if(force) {
        allItems[i].price = 0;
      } else if (r.recipe && r.recipe.length) {
        p = 0;
        r.recipe.forEach(function (o) {
          it = allItems[o[0]]
          p = p + it.price * o[1];
        });
        if(p) {
          p = p * (1.05 + (r.recipe.length - 1) * 0.23);
          allItems[i].price = Math.round(p * 100) / 100;
        } else {
          unsetCount++;
        }
      } else {
        unsetCount++;
      }
    }
  });
  
  if(!prevUnsetCount || (unsetCount > 0 && unsetCount < prevUnsetCount))
    calculateUnsetPrices(unsetCount);
  else if(unsetCount > 0)
    calculateUnsetPrices(unsetCount, true);
}

var allItems = JSON.parse(JSON.stringify(resources));
calculateUnsetPrices();
    
module.exports = {
  loadResources: function(cb) {
    var started = new Date;
    var promise = PIXI.loader;
    _.forEach(images, function(path, name) {
      promise.add(name, path)
    })
    /*resources.forEach(function(r) {
      if(r.icon) {
        promise = promise.add(r.name, r.icon)
      }
    });*/
    promise
      .once('complete', function(loader, resources) {
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
  commonResources: commonResources,
  allItems: allItems,
  craftableItems: craftableItems,
  groupItemIds: function(group) {
    if(!_.isNumber(group) || group < 0)
      return null;

    var result = [];
    craftableItems.forEach(function(o) {
      if(o.group === group)
        result.push(o.id);
    });
    return result;
  },
  getItemById: function(id) {
    return _.find(resources, {id: id});
  }
}