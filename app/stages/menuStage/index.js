'use strict';

var PIXI = require('pixi.js');
var utils = require('utils');

var TextInput = require('components/view/TextInput');
var storeManager = require('managers/StoreManager');

function Button(_text, _mouseDownCb) {
  var bt = new PIXI.Text(_text, {fontFamily : 'Calibri', fontSize: 26, fontWeight: 'bold', fill : 0xededed});
  bt.buttonMode = true;
  bt.interactive = true;
  bt.on('mousedown', _mouseDownCb);
  bt.on('touchstart', _mouseDownCb);
  bt.on('mouseover', function() {
    bt.style.fill = 0xbcbcbc;
    bt.dirty = true;
  });
  bt.on('mouseout', function() {
    bt.style.fill = 0xededed;
    bt.dirty = true;
  });
  return bt;
}

module.exports = function(_name, _width, _height, _startGameCb) {
  var name = _name;
  var width = _width;
  var height = _height;
  var container = new PIXI.Container();

  //initially invisible 
  container.visible = false;

  var bg = new PIXI.Graphics();
  bg.beginFill(0x232323);
  bg.drawRect(0, 0, width, height);
  container.addChild(bg);

  //menu group
  var menuGroup = new PIXI.Container();
  var newGame = Button('Новая игра', function() {
    newGameGroup.visible = true;
    menuGroup.visible = false;
  });
  newGame.y = 0;
  menuGroup.addChild(newGame);

  var loadGame = Button('Продолжить', function() {
    storeManager.loadGame();
    _startGameCb();
  });
  loadGame.y = newGame.y + newGame.height + 15;
  menuGroup.addChild(loadGame);

  newGame.x = (menuGroup.width - newGame.width) / 2;
  loadGame.x = (menuGroup.width - loadGame.width) / 2;

  menuGroup.x = (width - menuGroup.width) / 2;
  menuGroup.y = (height - menuGroup.height) / 2;
  container.addChild(menuGroup);

  //new game group
  var newGameGroup = new PIXI.Container();

  var warning = new PIXI.Text('Предыдущая игра будет потеряна!', {fontFamily : 'Calibri', fontSize: 26, fontWeight: 'bold', fill : 0xBA291F });
  warning.x = (width - warning.width) / 2;
  warning.y = height / 10;
  newGameGroup.addChild(warning);

  var back = Button('<<', function() {
    menuGroup.visible = true;
    newGameGroup.visible = false;
  });
  back.x = width / 10;
  back.y = height / 10;
  newGameGroup.addChild(back);
  
  var enterName = new PIXI.Text('Введите имя:', {fontFamily : 'Calibri', fontSize: 22, fontWeight: 'bold', fill : 0xededed});
  enterName.x = (width - enterName.width) / 2;
  enterName.y = (height - enterName.height) / 3;
  newGameGroup.addChild(enterName);

  var input = TextInput(250, 26);
  input.x = (width - input.width) / 2;
  input.y = enterName.y + enterName.height + 10;
  newGameGroup.addChild(input);

  var startGame = Button('Начать игру', function() {
    input.removeListener();
    storeManager.set('player', input.getValue());
    _startGameCb();
  });
  startGame.x = (width - startGame.width) / 2;
  startGame.y = input.y + input.height + 30;
  newGameGroup.addChild(startGame);
  
  newGameGroup.visible = false;
  container.addChild(newGameGroup);

  return {
    name: name,
    container: container
  }
}