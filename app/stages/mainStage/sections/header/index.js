'use strict';

var PIXI = require('pixi.js');

var storeManager = require('managers/StoreManager');
var utils = require('utils');

module.exports = function(_x, _y, _width, _height) {
  var x = _x;
  var y = _y;
  var width = _width;
  var height = _height;
  var container = new PIXI.Container();

  container.x = x;
  container.y = y;
  container.width = width;
  container.height = height;

  var head = new PIXI.Graphics();
  head.beginFill(0x25262B);
  head.drawRect(0, 0, width, height);
  container.addChild(head);

  var player = utils.Text(storeManager.get('player'), {fontFamily : 'Calibri', fontSize: 18, fontWeight: 'bold', fill : 0xdedede});
  player.x = 10;
  player.y = (height - player.height) / 2;
  container.addChild(player);

  var money = utils.Text(utils.stringCurrency(storeManager.get('money')), {fontFamily : 'Calibri', fontSize: 14, fontWeight: 'bold', fill : 0xdedede});
  money.x = width - money.width - 10;
  money.y = (height - money.height) / 2;
  container.addChild(money);

  storeManager.listen('money', function(value) {
    money.text = utils.stringCurrency(value);
  }, container);

  return container;
}