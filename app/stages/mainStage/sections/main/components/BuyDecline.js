'use strict';
var PIXI = require('pixi.js');
var _ = require('lodash');

var AcceptButton = require('./AcceptButton');
var DeclineButton = require('./DeclineButton');
var storeManager = require('managers/StoreManager');
var utils = require('utils');

var resources = require('defines').allItems;

const WIDTH = 240;
const HEIGHT = 30;
const GREEN = 0x32995E;
const RED = 0x993232;

module.exports = function() {
  var container = new PIXI.Container();
  container.width = WIDTH;
  container.height = HEIGHT;

  var toPayValue = 0;
  var enoughMoneyToBuy = true;
  var storeMoney = storeManager.get('money');
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

  var acceptButton = new AcceptButton('Купить', buy);
  acceptButton.x = declineButton.x - acceptButton.width - 10;
  acceptButton.y = (HEIGHT - acceptButton.height) / 2;
  container.addChild(acceptButton);

  var toPay = new PIXI.Text(utils.stringCurrency(toPayValue), {fontFamily : 'Calibri', fontSize: 14, fontWeight: 'bold', fill : GREEN});
  toPay.x = acceptButton.x - toPay.width - 10;
  toPay.y = (HEIGHT - toPay.height) / 2;
  container.addChild(toPay);

  storeManager.listen('money', function(value) {
    storeMoney = value;
    update();
  }, container);
  storeManager.listen('toBuy', setPrice, container);
  
  setPrice(storeManager.get('toBuy'));

  function setPrice(list) {
    cartList = list;
    var value = 0;
    cartList.forEach(function(n, i) {
      value += resources[i].price * n;
    }); 

    toPayValue = utils.numberCurrency(value);
    update();
  }

  function update() {
    if(toPay) {
      toPay.text = utils.stringCurrency(toPayValue);
      toPay.x = acceptButton.x - toPay.width - 10;
      enoughMoneyToBuy = toPayValue <= storeMoney;
      toPay.style.fill = enoughMoneyToBuy ? GREEN : RED;
      toPay.dirty = true;
    }
  }

  function buy() {
    if(!enoughMoneyToBuy || toPayValue <= 0)
      return;

    //decrease money
    storeManager.substract('money', toPayValue);
    storeMoney = storeManager.get('money');
    toPayValue = 0;
    update();

    //update inventory
    storeManager.addFrom('inventory', cartList);
    
    //clear toBuy
    storeManager.substractFrom('toBuy', cartList);
  }

  function decline() {
    if(!_.isEmpty(cartList)) {
      storeManager.substractFrom('toBuy', cartList);
    }
  }

  return container;
};