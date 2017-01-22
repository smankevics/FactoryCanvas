'use strict';
var PIXI = require('pixi.js');
var utils = require('utils');
var wrapper = utils.wrapper;

var storeManager = require('managers/StoreManager');

var Ticker = require('../Ticker');
var BuyBehavior = require('./BuyBehavior');
var SellBehavior = require('./SellBehavior');

const WIDTH = 230;
const HEIGHT = 75;

module.exports = function(_info, _behavior) {
  var info = _info;
  var container = new PIXI.Container();
  var behavior;
  var initialToBuy;
  var quantityNumber;
  
  if(_behavior == 'buy') {
    behavior = new BuyBehavior(info, container, updateQuantityText, onDeclinePress);
  } else if (_behavior == 'sell') {
    behavior = new SellBehavior(info, container, updateQuantityText, onDeclinePress);
  }
  initialToBuy = behavior.getTickerValue() || '';
  quantityNumber = behavior.getQuantity();

  function updateQuantityText(value) {
    quantityNumber = value;
    quantity.text = 'Кол-во: ' + value;
    quantity.x = iconBg.x + iconBg.width + 5;
    if(_behavior === 'sell')
      ticker.setMax(quantityNumber);
  }

  function onDeclinePress() {
    ticker.setValue(0);
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
  var quantity = new PIXI.Text('Кол-во: ' + quantityNumber, {fontFamily : 'Calibri', fontSize: 12, fontWeight: 'bold', fill : 0x232323});
  quantity.x = iconBg.x + iconBg.width + 5;
  quantity.y = HEIGHT - 20;
  container.addChild(quantity);

  //Ticker
  var ticker = new Ticker(WIDTH - 75, HEIGHT - 30, 70, behavior.setTickerValue, initialToBuy);
  if(_behavior === 'sell')
    ticker.setMax(quantityNumber);
  container.addChild(ticker.container);

  return {
    container: container,
    info: info
  }
};