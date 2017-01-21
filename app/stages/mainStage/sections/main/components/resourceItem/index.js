'use strict';
var PIXI = require('pixi.js');
var utils = require('utils');

var storeManager = require('managers/StoreManager');

var BuyBehavior = require('./BuyBehavior');
var SellBehavior = require('./SellBehavior');

const WIDTH = 80;
const HEIGHT = 100;

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
    toBuy.x = (WIDTH - toBuy.width) / 2;
  }

  function updateQuantityText(value) {
    quantity.text = value;
    quantity.x = WIDTH - quantity.width - 5;
  }

  var bg = new PIXI.Graphics();
  bg.beginFill(0xbababa);
  bg.drawRoundedRect(0, 0, WIDTH, HEIGHT, 5);
  container.addChild(bg);

  var name = utils.Text(info.name, {fontFamily : 'Calibri', fontSize: 14, fontWeight: 'bold', fill : 0x232323});
  name.x = (WIDTH - name.width) / 2;
  name.y = 2;
  container.addChild(name);

  var iconBg = new PIXI.Graphics();
  iconBg.beginFill(0x444444);
  iconBg.drawRect(0, 0, 40, 40);
  iconBg.x = (WIDTH - 40) / 2;
  iconBg.y = name.y + name.height + 2;
  container.addChild(iconBg);

  if(!PIXI.loader.resources[info.name])
    throw new Error('Unable to find ' + info.name + ' texture');

  var icon = new PIXI.Sprite(PIXI.loader.resources[info.name].texture);
  icon.width = 34;
  icon.height = 34;
  icon.x = (WIDTH - icon.width) / 2;
  icon.y = iconBg.y + 3;
  container.addChild(icon);

  var price = utils.Text(utils.stringCurrency(info.price), {fontFamily : 'Calibri', fontSize: 12, fontWeight: 'bold', fill : 0x232323});
  price.x = 5;
  price.y = iconBg.y + iconBg.height + 2;
  container.addChild(price);

  var quantity = utils.Text(behavior.getQuantity() + '', {fontFamily : 'Calibri', fontSize: 12, fontWeight: 'bold', fill : 0x232323});
  quantity.x = WIDTH - quantity.width - 5;
  quantity.y = iconBg.y + iconBg.height + 2;
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
    behavior.updateTicker(false);
  });
  btGr1.on('touchstart', function() {
    behavior.updateTicker(false);
  });
  btGr1.on('touchend', behavior.releaseTicker);
  btGr1.on('mouseup', behavior.releaseTicker);
  btGr1.on('mouseout', behavior.releaseTicker);
  var btGr1bg = new PIXI.Graphics();
  btGr1bg.beginFill(0xdedede);
  btGr1bg.drawRect(0, 0, 16, 16);
  btGr1.addChild(btGr1bg);
  var dec = utils.Text('-', {fontFamily : 'Calibri', fontSize: 24, fontWeight: 'bold', fill : 0x232323});
  dec.x = (btGr1.width - dec.width) / 2;
  dec.y = (btGr1.height - dec.height) / 2 - 1;
  btGr1.addChild(dec);
  container.addChild(btGr1);

  var toBuy = utils.Text(initialToBuy, {fontFamily : 'Calibri', fontSize: 12, fill : 0x000000});
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
    behavior.updateTicker(true);
  });
  btGr2.on('touchstart', function() {
    behavior.updateTicker(true);
  });
  btGr2.on('touchend', behavior.releaseTicker);
  btGr2.on('mouseup', behavior.releaseTicker);
  btGr2.on('mouseout', behavior.releaseTicker);
  var btGr2bg = new PIXI.Graphics();
  btGr2bg.beginFill(0xdedede);
  btGr2bg.drawRect(0, 0, 16, 16);
  btGr2.addChild(btGr2bg);
  var dec = utils.Text('+', {fontFamily : 'Calibri', fontSize: 20, fontWeight: 'bold', fill : 0x232323});
  dec.x = (btGr2.width - dec.width) / 2;
  dec.y = (btGr2.height - dec.height) / 2 - 1;
  btGr2.addChild(dec);
  container.addChild(btGr2);

  return {
    container: container,
    info: info
  }
};