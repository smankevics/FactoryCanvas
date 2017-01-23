'use strict';

module.exports = {
  views: {},
  current: null,
  addView: function(name, view) {
    if(this.views[name]) {
      this.views[name].children.forEach(function(c) {
          c.destroy({children: true});
        });
      this.views[name].removeChildren();
    }
    this.views[name] = view;
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