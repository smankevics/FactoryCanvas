'use strict';
var PIXI = require('pixi.js');

module.exports = function(view, _width, _height) {
  var width = _width;
  var height = _height;
  var container = new PIXI.Container();
  container.x = 0;
  container.y = 0;
  container.width = width;
  container.height = height;
  container.interactive = true;

  //transparent background to catch events
  var bg = new PIXI.Graphics();
  bg.beginFill(0xffffff);
  bg.drawRect(0, 0, width, height);
  bg.alpha = 0;
  container.addChild(bg);
  
  var mouseOver = false;
  container.on('mouseover', function() {
    mouseOver = true;
  });

  container.on('mouseout', function() {
    mouseOver = false;
  });

  var scrollable = new PIXI.Container();

  document.addEventListener("mousewheel", function(e) {
    if(view.visible && mouseOver) {
      if(e.deltaY < 0) {
        scrollable.y = scrollable.y - e.deltaY <= 0 ? scrollable.y - e.deltaY : 0;
      } else {
        scrollable.y = Math.abs(scrollable.y - height) <= scrollable.height ? scrollable.y - e.deltaY : scrollable.y;
      }
    }
  }, false);

  function addChild(child) {
    scrollable.addChild(child);

    //align center if multiple lines
    if(scrollable.width + child.width > container.width)
      scrollable.x = (width - scrollable.width) / 2;
    else
      scrollable.x = 5;
  }

  container.addChild(scrollable);

  var mask = new PIXI.Graphics();
  mask.beginFill(0xffffff);
  mask.drawRect(0, 110, width, height);
  mask.alpha = 0;
  mask.y = 0;

  container.mask = mask;

  return {
    container: container,
    addChild: addChild
  }
};