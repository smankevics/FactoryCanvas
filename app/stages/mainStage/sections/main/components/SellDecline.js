'use strict';
var PIXI = require('pixi.js');
var _ = require('lodash');

var AcceptButton = require('./AcceptButton');
var DeclineButton = require('./DeclineButton');
var storeManager = require('managers/StoreManager');
var utils = require('utils');

var resources = require('../../../../../defines').allItems;

const WIDTH = 240;
const HEIGHT = 30;
const GREEN = 0x32995E;
const RED = 0x993232;

module.exports = function() {
  var container = new PIXI.Container();
  container.width = WIDTH;
  container.height = HEIGHT;
  
  var earnValue = 0;
  var cartList = [];
  
  //components
  var bg = new PIXI.Graphics();
  bg.beginFill(0xbababa);
  bg.drawRect(0, 0, WIDTH, HEIGHT);
  container.addChild(bg);

  var declineButton = new DeclineButton('Отмена', decline);
  declineButton.x = WIDTH - declineButton.width - 5;
  declineButton.y = (HEIGHT - declineButton.height) / 2;
  container.addChild(declineButton);

  var acceptButton = new AcceptButton('Продать', sell);
  acceptButton.x = declineButton.x - acceptButton.width - 10;
  acceptButton.y = (HEIGHT - acceptButton.height) / 2;
  container.addChild(acceptButton);

  var toEarn = new PIXI.Text(utils.stringCurrency(earnValue), {fontFamily : 'Calibri', fontSize: 14, fontWeight: 'bold', fill : GREEN});
  toEarn.x = acceptButton.x - toEarn.width - 10;
  toEarn.y = (HEIGHT - toEarn.height) / 2;
  container.addChild(toEarn);

  setPrice(storeManager.get('toSell'));
  storeManager.listen('toSell', setPrice, container);

  function setPrice(list) {
    cartList = list;
    var value = 0;
    cartList.forEach(function(n, i) {
      value += resources[i].price * n;
    }); 

    earnValue = utils.numberCurrency(value);
    update();
  }

  function update() {
    if(toEarn) {
      toEarn.text = utils.stringCurrency(earnValue);
      toEarn.x = acceptButton.x - toEarn.width - 10;
    }
  }

  function sell() {
    if(earnValue <= 0)
      return;

    var storeMoney = storeManager.get('money');

    //increase money
    storeManager.add('money', earnValue);
    earnValue = 0;
    update();

    //update inventory
    storeManager.substractFrom('inventory', cartList);
    
    //clear toSell
    storeManager.substractFrom('toSell', cartList);
  }

  function decline() {
    if(earnValue > 0) {
      storeManager.substractFrom('toSell', cartList);
    }
  }

  return container;
};