'use strict';

var PIXI = require('pixi.js');

var defines = require('../../../../../../../defines');
var ResourceItem = require('../../../components/resourceItem');
var state = require('managers/StateManager');

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
  var initialGroup = state.get('workbench.selectedGroup');
  var initialMaterial = state.get('workbench.selectedMaterial');

  var bg = new PIXI.Graphics();
  bg.beginFill(0xbababa);
  bg.drawRect(0, 0, width, height);
  container.addChild(bg);

  var list, items = [];

  function updateSelection(selectedId, initial) {
    if (!items)
      return;

    if(!initial) {
      state.set('workbench.selectedMaterial', selectedId);
      state.set('workbench.itemsToCraft', 1);
    }

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

    var resources = defines.groupItems(group);

    list = new PIXI.UI.ScrollingContainer(0, 0, 0, 0, width - 10, height);

    var i = 0, rw = 0, rh = 10;
    resources.forEach(function (resource) {
      var res = new ResourceItem(resource, null);
      res.setSelectCb(updateSelection);
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

    container.addChild(list);
  }

  setGroup(initialGroup, true);

  function setGroup(_group, initial) {
    group = _group;
    populateList();

    //select item
    if(!items.length)
      return;
      
    var it = initialMaterial && initial ? initialMaterial : items[0].info.id;
    updateSelection(it, initial);
  }

  return {
    width: container.width,
    container: container,
    setGroup: setGroup
  };
}