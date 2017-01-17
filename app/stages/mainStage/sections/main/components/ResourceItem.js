'use strict';
var PIXI = require('pixi.js');

const WIDTH = 80;
const HEIGHT = 100;

module.exports = function(_info, _x, _y, _count) {
  var info = _info;
  var count = _count || 0;
  var container = new PIXI.Container();
  container.x = _x;
  container.y = _y;

  var buyCount = 0;

  function setBuyValue(inc) {
    if(!inc && buyCount == 0)
      return;

    if(inc) 
      buyCount++;
    else
      buyCount--;
      
    if(buyCount > 0) {
      toBuy.text = '+' + buyCount;
      toBuy.x = (WIDTH - toBuy.width) / 2;
    } else {
      toBuy.text = '';
    }
  }

  var border = new PIXI.Graphics();
  border.beginFill(0xcccccc);
  border.drawRoundedRect(0, 0, WIDTH, HEIGHT, 5);
  container.addChild(border);

  var icon = new PIXI.Graphics();
  icon.beginFill(0xeeeeee);
  icon.drawRect(0, 0, 40, 40);
  icon.x = (WIDTH - icon.width) / 2;
  icon.y = 5;
  container.addChild(icon);

  var name = new PIXI.Text(info.name, {fontFamily : 'Calibri', fontSize: 14, fontWeight: 'bold', fill : 0x232323});
  name.x = (WIDTH - name.width) / 2;
  name.y = icon.y + icon.height + 2;
  container.addChild(name);

  var quantity = new PIXI.Text('0', {fontFamily : 'Calibri', fontSize: 14, fontWeight: 'bold', fill : 0x232323});
  quantity.x = (WIDTH - quantity.width) / 2;
  quantity.y = name.y + name.height;
  container.addChild(quantity);

  //decrease button
  var btGr1 = new PIXI.Container();
  btGr1.x = 5;
  btGr1.y = HEIGHT - 21;
  btGr1.height = 16;
  btGr1.width = 16;
  btGr1.buttonMode = true;
  btGr1.interactive = true;
  btGr1.on('mousedown', function() {
    setBuyValue(false);
  });
  var btGr1bg = new PIXI.Graphics();
  btGr1bg.beginFill(0xdedede);
  btGr1bg.drawRect(0, 0, 16, 16);
  btGr1.addChild(btGr1bg);
  var dec = new PIXI.Text('-', {fontFamily : 'Calibri', fontSize: 20, fontWeight: 'bold', fill : 0x232323});
  dec.x = (btGr1.width - dec.width) / 2;
  dec.y = (btGr1.height - dec.height) / 2 - 1;
  btGr1.addChild(dec);
  container.addChild(btGr1);

  var toBuy = new PIXI.Text('', {fontFamily : 'Calibri', fontSize: 14, fill : 0x000000});
  toBuy.x = (WIDTH - toBuy.width) / 2;
  toBuy.y = HEIGHT - 21;
  container.addChild(toBuy);

  //increase button
  var btGr2 = new PIXI.Container();
  btGr2.x = WIDTH - 21;
  btGr2.y = HEIGHT - 21;
  btGr2.height = 16;
  btGr2.width = 16;
  btGr2.buttonMode = true;
  btGr2.interactive = true;
  btGr2.on('mousedown', function() {
    setBuyValue(true);
  });
  var btGr2bg = new PIXI.Graphics();
  btGr2bg.beginFill(0xdedede);
  btGr2bg.drawRect(0, 0, 16, 16);
  btGr2.addChild(btGr2bg);
  var dec = new PIXI.Text('+', {fontFamily : 'Calibri', fontSize: 20, fontWeight: 'bold', fill : 0x232323});
  dec.x = (btGr2.width - dec.width) / 2;
  dec.y = (btGr2.height - dec.height) / 2 - 1;
  btGr2.addChild(dec);
  container.addChild(btGr2);

  return {
    container: container,
    info: info
  }
};