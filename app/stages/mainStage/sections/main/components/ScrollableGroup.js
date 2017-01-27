'use strict';
var _ = require('lodash');
var PIXI = require('pixi.js');

module.exports = function(_width, _height) {
  var width = _width;
  var height = _height;
  var stage = new PIXI.UI.Stage(width, height);

  var list = new PIXI.UI.ScrollingContainer(true, false, 1, 0, width, height);
  stage.addChild(list);
  list.initialize();

  var items = [];

  stage.packItem = function(item) {
    item.hitArea = new PIXI.Rectangle(0, 0, 0, 0);
    var res = new PIXI.UI.Container(item.width, item.height);
    res.container = item;
    return res;
  };

  stage.addItem = function(item) {
    items.push(item);
    list.addChild(item);
  };

  stage.filter = function(filteredItems) {
    list.children.forEach(function(o) {
      o.visible = !filteredItems || filteredItems.indexOf(o.container.info.id) > -1;
    })
  }

  stage.getFirstVisibleItemId = function() {
    for(var o in list.children) {
      if(list.children[o].visible)
        return list.children[o].container.info.id;
    }
  }

  stage.reposition = function() {
    var rw = 0, rh = 0;
    list.children.forEach(function(o) {
      if(o.visible) {
        o.x = rw;
        o.y = rh;
        rw += o.width + 8;
        if (rw + o.width > width) {
          rw = 0;
          rh += o.height + 8;
        }
      }
    });
  }

  return stage;
};