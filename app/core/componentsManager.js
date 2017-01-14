'use strict';

var Text = require('./components/text');

module.exports = function() {
  var components = [];

  return {
    addComponent: function(_ctx, _type, _name, _x, _y) {
      if(_type === 'TEXT') {
        components.push(new Text(_ctx, _name, _x, _y));
      }
    },
    renderComponents: function() {
      components.forEach(function(c) {
        
      });
    }  
  }
};