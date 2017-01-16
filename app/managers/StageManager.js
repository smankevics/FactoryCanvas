'use strict';

module.exports = function(_application) {
  var application = _application;
  var stages = {};
  var current = null;

  function addStage(stage) {
    if(!stages[stage.name]) {
      stages[stage.name] = stage;
      application.addChild(stage.container);
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