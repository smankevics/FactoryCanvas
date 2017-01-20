'use strict';

var PIXI = require('pixi.js');
var _ = require('lodash');

var groups = require('./groups');
var resources = require('./resources');

var commonResources = _.filter(resources, {level: 1});
var craftableItems = _.filter(resources, function(o) { return o.level > 1 });

var allItems = JSON.parse(JSON.stringify(resources));
allItems.forEach(function (r) {
  if (!r.price) {
    r.price = 0;
    r.recipe.forEach(function (o) {
      r.price += resources[o[0]].price * o[1];
    });
    //add income for craft
    r.price = r.price * 2;
    r.price = Math.round(r.price * 100) / 100;
  }
});
    
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
  groupItems: function(group) {
    var ids = (_.isNumber(group) && group >= 0) ? groups[group].items : null;
    
    if(ids) {
      var result = [];
      ids.forEach(function(n) {
        result.push(resources[n]);
      });
      return result;
    } else {
      return craftableItems;
    }
  },
  getItemById: function(id) {
    return _.find(resources, {id: id});
  }
}