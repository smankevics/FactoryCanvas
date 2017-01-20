'use strict';

var PIXI = require('pixi.js');

var defines = require('defines');
var RecipeItem = require('../components/RecipeItem');
var storeManager = require('managers/StoreManager');
var Ticker = require('../../../components/Ticker');

const INITIAL_ITEMS_TO_CRAFT = 1;

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

  var bg = new PIXI.Graphics();
  bg.beginFill(0xbababa);
  bg.drawRect(0, 0, width, height);
  container.addChild(bg);

  var name = new PIXI.Text('', {fontFamily : 'Calibri', fontSize: 20, fontWeight: 'bold', fill : 0x222222});
  name.x = (width - name.width) / 2;
  name.y = 10;
  container.addChild(name);

  //Icon
  var iconBg = new PIXI.Graphics();
  iconBg.beginFill(0x444444);
  iconBg.drawRect(0, 0, 140, 140);
  iconBg.x = (width - iconBg.width) / 2;
  iconBg.y = name.y + name.height + 10;
  container.addChild(iconBg);

  var icon;

  //Current Items
  var currentItemsText = new PIXI.Text('0', {fontFamily : 'Calibri', fontSize: 16, fontWeight: 'bold', fill : 0xcdcdcd});
  updateCurrentItemsText('0');
  container.addChild(currentItemsText);

  //Recipe text
  var recipeText = new PIXI.Text('Recipe', {fontFamily : 'Calibri', fontSize: 16, fontWeight: 'bold', fill : 0x222222});
  recipeText.x = 10;
  recipeText.y = iconBg.y + iconBg.height + 20;
  container.addChild(recipeText);

  //Recipe list
  var recipeList, recipeArray = [];

  //Ticker
  var ticker = new Ticker(0, 0, 70, function(n) {
    recipeArray.forEach(function(r) {
      r.updateIemsToCraft(n);
    });
  }, INITIAL_ITEMS_TO_CRAFT);
  ticker.setMin(1);
  container.addChild(ticker.container);

  //Functions
  function updateImage(name) {
    if(icon)
      icon.destroy();
    
    icon = new PIXI.Sprite(PIXI.loader.resources[name].texture);
    icon.width = 128;
    icon.height = 128;
    icon.x = (iconBg.width - icon.width) / 2;
    icon.y = (iconBg.height - icon.height) / 2;

    iconBg.addChild(icon);
  }

  function updateCurrentItemsText(value) {
    currentItemsText.text = value + '';
    currentItemsText.x = iconBg.x + iconBg.width - currentItemsText.width - 5;
    currentItemsText.y = iconBg.y + iconBg.height - currentItemsText.height - 5;
  }

  function updateCurrentItems(id) {
    updateCurrentItemsText(storeManager.get('inventory[' + id +']'));
    storeManager.listen('inventory', function(list) {
      updateCurrentItemsText(list[id]);
    }, container);
  }

  function updateRecipe(recipe) {
    if(recipeList)
      recipeList.destroy({children: true});

    recipeArray = [];
    
    recipeList = new PIXI.Container();
    recipeList.x = 0;
    recipeList.y = recipeText.y + recipeText.height;
    recipeList.width = width;
    
    var rh = 0;
    recipe.forEach(function(ni) {
      var res = new RecipeItem(rh, width, ni[0], ni[1]);
      rh += res.container.height;
      res.updateIemsToCraft(INITIAL_ITEMS_TO_CRAFT);
      recipeArray.push(res);
      recipeList.addChild(res.container);
    });
    container.addChild(recipeList);
  }

  function updateTickerPosition() {
    ticker.container.x = width - ticker.container.width - 10;
    ticker.container.y = recipeList.y + recipeList.height + 20;
    ticker.setValue(INITIAL_ITEMS_TO_CRAFT);
  }

  function setMaterial(itemId) {
    var item = defines.getItemById(itemId);

    updateImage(item.name);
    updateCurrentItems(item.id);
    updateRecipe(item.recipe);
    updateTickerPosition();

    //Item name
    name.text = item.name;
    name.x = (width - name.width) / 2;
  }

  return {
    width: container.width,
    container: container,
    setMaterial: setMaterial
  };
}