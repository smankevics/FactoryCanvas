'use strict';

module.exports = {
  views: {},
  current: null,
  addView: function(name, view) {
    if(!this.views[name]) {
      this.views[name] = view;
    } else {
      throw 'Error: View \'' + name + '\' is already in the list!';
    }
  },
  setView: function(name) {
    if(this.views[name]) {
      if(this.current)
        this.current.visible = false;
      
      this.current = this.views[name];
      this.current.visible = true;
    } else {
      throw 'Error: View \'' + name + '\' doesn\'t exist!';
    }
  }
};