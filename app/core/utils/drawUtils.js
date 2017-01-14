'use strict';

module.exports = {
  clearRect: function(_ctx, _w, _h) {
    _ctx.clearRect(0, 0, _w, _h);
  },
  strokeRect: function(_ctx, _x, _y, _w, _h, _lineWidth, _color) {
    _ctx.beginPath();
    _ctx.lineWidth = _lineWidth || 1;
    _ctx.strokeStyle = _color || '#000000';
    _ctx.rect(_x, _y, _w, _h);
    _ctx.stroke();
  },
  fillText: function(_ctx, _text, _x, _y, _fontSize, _color) {
    _ctx.fillStyle = _color || '#000000';
    _ctx.font = _fontSize || 14 + 'px';
    _ctx.fillText(_text, _x, _y);
  }
};