'use strict';
var PIXI = require('pixi.js');
var utils = require('utils');
var wrapper = utils.wrapper;

var storeManager = require('managers/StoreManager');

var Ticker = require('../Ticker');
var BuyBehavior = require('./BuyBehavior');
var SellBehavior = require('./SellBehavior');

const WIDTH = 230;
var HEIGHT = 70;
const COLOR = 0xbababa;
const SELECTED_COLOR = 0xcdcdcd;

module.exports = function(_info, _behavior) {
  var info = _info;
  var behavior;
  var initialToBuy;
  var quantityNumber;

  HEIGHT = _behavior ? 70 : 38;

  var container = new PIXI.Container();
  
  if(_behavior == 'buy') {
    behavior = new BuyBehavior(info, container, updateQuantityText, onDeclinePress);
  } else if (_behavior == 'sell') {
    behavior = new SellBehavior(info, container, updateQuantityText, onDeclinePress);
  }

  if(behavior) {
    initialToBuy = behavior.getTickerValue() || '';
    quantityNumber = behavior.getQuantity();
  }

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
  bg.lineStyle(1, SELECTED_COLOR, 1);
  bg.beginFill(0xbababa);
  bg.drawRoundedRect(0, 0, WIDTH, HEIGHT, 5);
  bg.endFill();
  container.addChild(bg);

  //item icon
  var iconBg = new PIXI.Graphics();
  iconBg.beginFill(0xffffff);
  iconBg.drawRect(0, 0, 32, 32);
  iconBg.x = 5;
  iconBg.y = 3;
  container.addChild(iconBg);

  if(!PIXI.loader.resources[info.name])
    throw new Error('Unable to find ' + info.name + ' texture');

  var icon = new PIXI.Sprite(PIXI.loader.resources[info.name].texture);
  icon.width = 32;
  icon.height = 32;
  icon.x = iconBg.x;
  icon.y = iconBg.y;
  container.addChild(icon);
  
  //item name
  var tName = wrapper(info.name, {width: 25});
  var name = new PIXI.Text(tName, {fontFamily : 'Calibri', fontSize: 13, fontWeight: 'bold', align: 'center', fill : 0x232323});
  name.x = (WIDTH - name.width + iconBg.x + iconBg.width) / 2;
  name.y = (iconBg.height - name.height) / 2;
  container.addChild(name);

  if(behavior) {
    //price
    var price = new PIXI.Text('Цена: ' + utils.stringCurrency(info.price), {fontFamily : 'Calibri', fontSize: 12, fontWeight: 'bold', fill : 0x232323});
    price.x = 5;
    price.y = iconBg.y + iconBg.height + 3;
    container.addChild(price);

    //quantity
    var quantity = new PIXI.Text('Кол-во: ' + quantityNumber, {fontFamily : 'Calibri', fontSize: 12, fontWeight: 'bold', fill : 0x232323});
    quantity.x = 5;
    quantity.y = iconBg.y + iconBg.height + 18;
    container.addChild(quantity);

    //Ticker
    var ticker = new Ticker(WIDTH - 75, HEIGHT - 25, 70, behavior.setTickerValue, initialToBuy);
    if(_behavior === 'sell')
      ticker.setMax(quantityNumber);
    container.addChild(ticker.container);
  }

  function select() {
    if(!bg)
      return;

    bg.graphicsData[0].fillColor = SELECTED_COLOR;
    bg.dirty = true;
  }

  function deselect() {
    if(!bg)
      return;

    bg.graphicsData[0].fillColor = COLOR;
    bg.dirty = true;
  }

  function setSelectCb(selectCb) {
    container.buttonMode = true;
    container.interactive = true;
    container.on('mousedown', function() {
      selectCb(info.id);
    });
    container.on('tap', function() {
      selectCb(info.id);
    });
  }

  return {
    container: container,
    info: info,
    setSelectCb, setSelectCb,
    select: select,
    deselect: deselect
  }
};