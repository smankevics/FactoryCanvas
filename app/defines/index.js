'use strict';

var resources = require('./resources');

module.exports = {
  resources: function() {
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