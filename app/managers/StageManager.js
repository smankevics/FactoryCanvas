'use strict';

module.exports = function(_application) {
  var application = _application;
  var stages = {};
  var current = null;

  function updateLayersOrder() {
    application.children.sort(function(a,b) {
        a.zIndex = a.zIndex || 0;
        b.zIndex = b.zIndex || 0;
        return b.zIndex - a.zIndex
    });
  };

  function addStage(stage, zIndex) {
    if(!stages[stage.name]) {
      stages[stage.name] = stage;

      stage.container.zIndex = zIndex;

      application.addChild(stage.container);
      updateLayersOrder();
    } else {
      throw 'Stage ' + stage.name + ' is already in the list!';
    }
  }

  function setStage(name) {
    if(stages[name]) {
      if(current)
        current.visible = false;
      
      current = stages[name].container;
      current.visible = true;
    } else {
      throw 'Stage ' + name + ' doesn\'t exist!';
    }
  }

  return {
    addStage: addStage,
    setStage: setStage
  }
}