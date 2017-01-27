'use strict';

var PIXI = require('pixi.js');

var defines = require('../../../../../../../defines');
var ResourceItem = require('../../../components/resourceItem');
var state = require('managers/StateManager');
var ScrollableGroup = require('../../../components/ScrollableGroup');

module.exports = function (_x, _y, _width, _height, onMaterialSelectCb) {
  var x = _x;
  var y = _y;
  var width = _width;
  var height = _height;
  var container = new PIXI.Container();

  var bg = new PIXI.Graphics();
  bg.beginFill(0xbababa);
  bg.drawRect(0, 0, width, height);
  container.addChild(bg);

  var scrollable = ScrollableGroup(width, height - 10);
  scrollable.y = 5;
  container.addChild(scrollable);

  container.x = x;
  container.y = y;
  container.width = width;
  container.height = height;

  var group;
  var initialGroup = state.get('workbench.selectedGroup');
  var initialMaterial = state.get('workbench.selectedMaterial');

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
    
    items = [];
    var resources = defines.craftableItems;

    var r, res;
    resources.forEach(function (resource) {
      r = new ResourceItem(resource, null);
      r.setSelectCb(updateSelection);
      res = scrollable.packItem(r);
      
      items.push(r);
      scrollable.addItem(res);
    });
    scrollable.reposition();
  }

  populateList();
  setGroup(initialGroup, true);

  function setGroup(_group, initial) {
    group = _group;
    if(!initial) {
      scrollable.filter(defines.groupItemIds(group));
      scrollable.reposition();
    }

    //select item
    if(!items.length)
      return;
    
    var it = initialMaterial && initial ? initialMaterial : scrollable.getFirstVisibleItemId();
    updateSelection(it, initial);
  }

  return {
    width: container.width,
    container: container,
    setGroup: setGroup
  };
}