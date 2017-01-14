'use strict';

var drawUtils = require('../utils').drawUtils;

module.exports = function(_ctx, _name, _x, _y) {
  var name = _name;

  return {
    render: function(_text) {
      drawUtils.fillText(_ctx, _text, _x, _y);
    }
  }
};