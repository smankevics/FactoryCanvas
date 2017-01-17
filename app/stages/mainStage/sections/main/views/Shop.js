'use strict';

var PIXI = require('pixi.js');

var commonResources = require('../../../../../defines').commonResources();

var AcceptButton = require('../components/AcceptButton');
var DeclineButton = require('../components/DeclineButton');
var ResourceItem = require('../components/ResourceItem');

module.exports = function(_width, _height) {
  var width = _width;
  var height = _height;
  var container = new PIXI.Container();

  container.visible = false;
  container.width = width;
  container.height = height;

  var bg = new PIXI.Graphics();
  bg.beginFill(0xD7D7D8);
  bg.drawRect(0, 0, width, height);
  container.addChild(bg);

  var title = new PIXI.Text('Shop', {fontFamily : 'Calibri', fontSize: 24, fontWeight: 'bold', fill : 0x222222});
  title.x = (width - title.width) / 2;
  title.y = 5;
  container.addChild(title);

  var declineButton = new DeclineButton('Decline', function() {

  });
  declineButton.x = width - declineButton.width - 5;
  declineButton.y = 5;
  container.addChild(declineButton);

  var acceptButton = new AcceptButton('Buy', function() {

  });
  acceptButton.x = declineButton.x - acceptButton.width - 10;
  acceptButton.y = 5;
  container.addChild(acceptButton);

  var list = [];
  var i = 0, rw = 10, rh = 40;
  commonResources.forEach(function(r) {
    var res = new ResourceItem(r, rw, rh, 0);
    rw += res.container.width + 10;
    container.addChild(res.container);
    i++;
  });

  return container;
}