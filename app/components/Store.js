'use strict';

var defines = require('../defines');

var inventory = [];
var items = defines.allItems();
for(var i = 0; i < items.length; i++) {
  inventory[i] = 0;
}

module.exports = {
  player: 'Player',
  money: 100,
  inventory: inventory
};