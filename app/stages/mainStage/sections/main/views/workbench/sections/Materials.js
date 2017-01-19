'use strict';

var PIXI = require('pixi.js');

var groupItems = require('../../../../../../../defines').groupItems;
var ResourceItem = require('../components/WbResourceItem');

module.exports = function (_x, _y, _width, _height, onMaterialSelectCb) {
  var x = _x;
  var y = _y;
  var width = _width;
  var height = _height;
  var container = new PIXI.Container();

  container.x = x;
  container.y = y;
  container.width = width;
  container.height = height;

  var group;

  var bg = new PIXI.Graphics();
  bg.beginFill(0xbababa);
  bg.drawRect(0, 0, width, height);
  container.addChild(bg);

  var list, items = [];

  function updateSelection(selectedId) {
    if (!items)
      return;

    items.forEach(function (item) {
      if (item.info && item.info.id == selectedId) {
        item.select();
      } else {
        item.deselect();
      }
    });
    onMaterialSelectCb(selectedId);
  }

  function populateList() {
    if (list)
      list.destroy({ children: true });
    items = [];

    var resources = groupItems(group);

    list = new PIXI.Container();
    list.x = 5;
    list.width = width - 10;
    list.y = 0;
    list.height = height;

    var i = 0, rw = 0, rh = 10;
    resources.forEach(function (resource) {
      var res = new ResourceItem(resource, updateSelection);
      res.container.x = rw;
      res.container.y = rh;
      rw += res.container.width + 8;
      if (rw + res.container.width > width) {
        rw = 0;
        rh += res.container.height + 8;
      }

      list.addChild(res.container);
      items.push(res);
      i++;
    });

    //select first item
    updateSelection(resources[0].id);
    container.addChild(list);
  }

  populateList();

  function setGroup(_group) {
    group = _group;
    populateList();
  }

  return {
    width: container.width,
    container: container,
    setGroup: setGroup
  };
}