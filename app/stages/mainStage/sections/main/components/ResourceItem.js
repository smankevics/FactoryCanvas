'use strict';
var PIXI = require('pixi.js');

function button(text, x, y, color, mouseDownCb, mouseUpCb) {
  var bt = new PIXI.Text(text, {fontFamily : 'Calibri', fontSize: 14, fontWeight: 'bold', fill : color});
  bt.buttonMode = true;
  bt.interactive = true;
  bt.x = x;
  bt.y = y;
  bt.on('mousedown', mouseDownCb);
  bt.on('mouseup', mouseUpCb);
  return bt;
}

module.exports = function(_info, _x, _y, _count) {
  var info = _info;
  var count = _count || 0;
  var container = new PIXI.Container();
  container.x = _x;
  container.y = _y;

  var buy = 0;

  function setBuyValue(_val) {
    buy = _val;
    if(buy > 0)
      toBuy.text = '+' + buy;
    else
      toBuy.text = '';
  }

  var name = new PIXI.Text(info.name + ': ' + count, {fontFamily : 'Calibri', fontSize: 14, fontWeight: 'bold', fill : 0x000000});
  container.addChild(name);

  var toBuy = new PIXI.Text('', {fontFamily : 'Calibri', fontSize: 14, fill : 0x000000});
  toBuy.x = name.width;
  container.addChild(toBuy);

  var clear = button('X', 0, 16, 0xff0000, function(e) {
    setBuyValue(0);
  });
  container.addChild(clear);
  var dec10 = button('-10', 12, 16, 0xff0000, function(e) {
    setBuyValue(buy > 10 ? buy - 10 : 0);
  });
  container.addChild(dec10);
  var dec1 = button('-1', 36, 16, 0xff0000, function(e) {
    setBuyValue(buy > 1 ? buy - 1 : 0);
  });
  container.addChild(dec1);
  var inc1 = button('+1', 52, 16, 0x00bb00, function(e) {
    setBuyValue(buy + 1);
  });
  container.addChild(inc1);
  var inc10 = button('+10', 72, 16, 0x00bb00, function(e) {
    setBuyValue(buy + 10);
  });
  container.addChild(inc10);

  return {
    container: container,
    info: info
  }
};