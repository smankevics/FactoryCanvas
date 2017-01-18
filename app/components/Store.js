'use strict';

var _ = require('lodash');
var defines = require('../defines');

var inventory = _.fill(Array(defines.allItems().length), 0);

var shop = _.fill(Array(defines.commonResources().length), 0);

module.exports = {
  player: 'Player',
  money: 100,
  inventory: inventory,
  shop: shop,
  toBuy: [],
  toSell: []
};