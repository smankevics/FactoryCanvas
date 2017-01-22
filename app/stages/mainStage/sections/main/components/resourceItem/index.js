'use strict';
var PIXI = require('pixi.js');
var utils = require('utils');
var wrapper = utils.wrapper;

var storeManager = require('managers/StoreManager');

var BuyBehavior = require('./BuyBehavior');
var SellBehavior = require('./SellBehavior');

const WIDTH = 230;
const HEIGHT = 75;

module.exports = function(_info, _behavior) {
  var info = _info;
  var container = new PIXI.Container();
  var behavior;
  var initialToBuy;
  
  if(_behavior == 'buy') {
    behavior = new BuyBehavior(info, container, updateQuantityText, updateTickerText);
    initialToBuy = storeManager.get('toBuy[' + info.id + ']');
  } else if (_behavior == 'sell') {
    behavior = new SellBehavior(info, container, updateQuantityText, updateTickerText);
    initialToBuy = storeManager.get('toSell[' + info.id + ']');
  }
  initialToBuy = initialToBuy && initialToBuy > 0 ? '+'+initialToBuy : '';

  function updateTickerText(value) {
    toBuy.text = value;
    toBuy.x = btGr1.x + btGr1.width + (btGr2.x - btGr1.x - btGr1.width - toBuy.width) / 2;
  }

  function updateQuantityText(value) {
    quantity.text = 'Кол-во: ' + value;
    quantity.x = iconBg.x + iconBg.width + 5;
  }

  var bg = new PIXI.Graphics();
  bg.beginFill(0xbababa);
  bg.drawRoundedRect(0, 0, WIDTH, HEIGHT, 5);
  container.addChild(bg);

  //item icon
  var iconBg = new PIXI.Graphics();
  iconBg.beginFill(0xffffff);
  iconBg.drawRect(0, 0, 50, 50);
  iconBg.x = 5;
  iconBg.y = (HEIGHT - iconBg.height) / 2;
  container.addChild(iconBg);

  if(!PIXI.loader.resources[info.name])
    throw new Error('Unable to find ' + info.name + ' texture');

  var icon = new PIXI.Sprite(PIXI.loader.resources[info.name].texture);
  icon.width = 40;
  icon.height = 40;
  icon.x = iconBg.x + (iconBg.width - icon.width) / 2;
  icon.y = (HEIGHT - icon.height) / 2;
  container.addChild(icon);
  
  //item name
  var tName = wrapper(info.name, {width: 25});
  var name = new PIXI.Text(tName, {fontFamily : 'Calibri', fontSize: 13, fontWeight: 'bold', fill : 0x232323});
  name.x = (WIDTH - name.width + iconBg.x + iconBg.width) / 2;
  name.y = 2;
  container.addChild(name);

  //line
  var line = new PIXI.Graphics();
  line.beginFill(0xD7D7D8);
  line.drawRect(0, 0, WIDTH - iconBg.width - 20, 1);
  line.x = (WIDTH - line.width + iconBg.x + iconBg.width) / 2;
  line.y = HEIGHT / 2 - 5;
  container.addChild(line);

  //price
  var price = new PIXI.Text('Цена: ' + utils.stringCurrency(info.price), {fontFamily : 'Calibri', fontSize: 12, fontWeight: 'bold', fill : 0x232323});
  price.x = iconBg.x + iconBg.width + 5;
  price.y = HEIGHT - 35;
  container.addChild(price);

  //quantity
  var quantity = new PIXI.Text('Кол-во: ' + behavior.getQuantity(), {fontFamily : 'Calibri', fontSize: 12, fontWeight: 'bold', fill : 0x232323});
  quantity.x = iconBg.x + iconBg.width + 5;
  quantity.y = HEIGHT - 20;
  container.addChild(quantity);

  //decrease button
  var btGr1 = new PIXI.Container();
  btGr1.x = WIDTH - 70;
  btGr1.y = HEIGHT - 30;
  btGr1.height = 16;
  btGr1.width = 16;
  btGr1.buttonMode = true;
  btGr1.interactive = true;
  btGr1.on('mousedown', function() {
    behavior.updateTicker(false);
  });
  /*btGr1.on('touchstart', function() {
    behavior.updateTicker(false);
  });
  btGr1.on('touchend', behavior.releaseTicker);
  btGr1.on('touchendoutside', behavior.releaseTicker);*/
  btGr1.on('mouseup', behavior.releaseTicker);
  btGr1.on('mouseupoutside', behavior.releaseTicker);
  var btGr1bg = new PIXI.Graphics();
  btGr1bg.beginFill(0xdedede);
  btGr1bg.drawRect(0, 0, 16, 16);
  btGr1.addChild(btGr1bg);
  var dec = new PIXI.Text('-', {fontFamily : 'Calibri', fontSize: 24, fontWeight: 'bold', fill : 0x232323});
  dec.x = (btGr1.width - dec.width) / 2 + 1;
  dec.y = (btGr1.height - dec.height) / 2 - 1;
  btGr1.addChild(dec);
  container.addChild(btGr1);

  //increase button
  var btGr2 = new PIXI.Container();
  btGr2.x = WIDTH - 21;
  btGr2.y = HEIGHT - 30;
  btGr2.height = 16;
  btGr2.width = 16;
  btGr2.buttonMode = true;
  btGr2.interactive = true;
  btGr2.on('mousedown', function() {
    behavior.updateTicker(true);
  });
  /*btGr2.on('touchstart', function() {
    behavior.updateTicker(true);
  });
  btGr2.on('touchend', behavior.releaseTicker);
  btGr2.on('touchendoutside', behavior.releaseTicker);*/
  btGr2.on('mouseup', behavior.releaseTicker);
  btGr2.on('mouseupoutside', behavior.releaseTicker);
  var btGr2bg = new PIXI.Graphics();
  btGr2bg.beginFill(0xdedede);
  btGr2bg.drawRect(0, 0, 16, 16);
  btGr2.addChild(btGr2bg);
  var inc = new PIXI.Text('+', {fontFamily : 'Calibri', fontSize: 20, fontWeight: 'bold', fill : 0x232323});
  inc.x = (btGr2.width - inc.width) / 2 + 1;
  inc.y = (btGr2.height - inc.height) / 2;
  btGr2.addChild(inc);
  container.addChild(btGr2);

  var toBuy = new PIXI.Text(initialToBuy, {fontFamily : 'Calibri', fontSize: 12, fill : 0x000000});
  toBuy.x = btGr1.x + btGr1.width + (btGr2.x - btGr1.x - btGr1.width - toBuy.width) / 2;
  toBuy.y = btGr1.y + 1;
  container.addChild(toBuy);

  return {
    container: container,
    info: info
  }
};