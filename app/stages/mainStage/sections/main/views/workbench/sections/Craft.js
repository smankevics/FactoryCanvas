'use strict';

var PIXI = require('pixi.js');

var utils = require('utils');
var defines = require('defines');
var resourcesAtlas = require('defines/resourcesAtlas');
var RecipeItem = require('../components/RecipeItem');
var storeManager = require('managers/StoreManager');
var state = require('managers/StateManager');
var Ticker = require('../../../components/Ticker');
var AcceptButton = require('../../../components/AcceptButton');

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

  var item;
  var initialItemaToCraft;

  var bg = new PIXI.Graphics();
  bg.beginFill(0xbababa);
  bg.drawRect(0, 0, width, height);
  container.addChild(bg);

  var nameText = new PIXI.Text('', {fontFamily : 'Calibri', fontSize: 20, fontWeight: 'bold', align: 'center', fill : 0x222222});
  nameText.x = (width - nameText.width) / 2;
  nameText.y = 10;
  container.addChild(nameText);

  //Icon
  var iconBg = new PIXI.Graphics();
  iconBg.beginFill(0x444444);
  iconBg.drawRect(0, 0, 140, 140);
  iconBg.width = 140;
  iconBg.height = 140;
  iconBg.x = (width - iconBg.width) / 2;
  iconBg.y = nameText.y + nameText.height + 10;
  container.addChild(iconBg);

  var icon;

  //Current Items
  var currentItemsText = new PIXI.Text('0', {fontFamily : 'Calibri', fontSize: 16, fontWeight: 'bold', fill : 0xcdcdcd});
  updateCurrentItemsText('0');
  container.addChild(currentItemsText);

  //Recipe text
  var recipeText = new PIXI.Text('Рецепт', {fontFamily : 'Calibri', fontSize: 16, fontWeight: 'bold', fill : 0x222222});
  recipeText.x = 10;
  recipeText.y = iconBg.y + iconBg.height + 20;
  container.addChild(recipeText);

  //Recipe list
  var recipeList, recipeArray = [];

  //Craft Items
  var craftItemsText = new PIXI.Text('Количество: ', {fontFamily : 'Calibri', fontSize: 16, fontWeight: 'bold', fill : 0x222222});
  craftItemsText.x = 0;
  craftItemsText.y = 0;
  container.addChild(craftItemsText);

  var ticker = new Ticker(0, 0, 70, function(n) {
    recipeArray.forEach(function(r) {
      r.updateIemsToCraft(n);
    });
    state.set('workbench.itemsToCraft', n);
  }, initialItemaToCraft);
  ticker.setMin(1);
  container.addChild(ticker.container);

  //Craft Button
  var craftButton = new AcceptButton('Создать', function() {
    if(!recipeArray.length)
      return;
      
    var resForCraft = [];
    var canCraft = true;
    recipeArray.forEach(function(res) {
      resForCraft[res.info.id] = res.getValue();
      canCraft = canCraft && res.enoughToCraft();
    });
    if(canCraft) {
      //decrease resources
      storeManager.substractFrom('inventory', resForCraft);
      
      //add crafted items
      storeManager.add('inventory[' + item.id + ']', ticker.value());

      //reset ticker
      ticker.setValue(initialItemaToCraft, true);
    }
  });
  updateCraftButtonPosition();
  container.addChild(craftButton);

  //Functions
  function updateImage(item) {
    if(icon)
      icon.destroy();
    
    iconBg.x = (width - iconBg.width) / 2;
    iconBg.y = nameText.y + nameText.height + 10;
    
    var icn = resourcesAtlas.get(item.icon);
    icon = new PIXI.Sprite(new PIXI.Texture(PIXI.loader.resources['resources'].texture, new PIXI.Rectangle(icn.x, icn.y, icn.width, icn.height)));
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
    
    recipeText.y = iconBg.y + iconBg.height + 20;

    recipeArray = [];
    recipeList = new PIXI.Container();
    recipeList.x = 0;
    recipeList.y = recipeText.y + recipeText.height;
    recipeList.width = width;
    
    var rh = 5;
    recipe.forEach(function(ni) {
      var res = new RecipeItem(rh, width, ni[0], ni[1]);
      rh += res.container.height + 5;
      res.updateIemsToCraft(initialItemaToCraft);
      recipeArray.push(res);
      recipeList.addChild(res.container);
    });
    container.addChild(recipeList);
  }

  function updateTickerPosition() {
    craftItemsText.x = 10;
    craftItemsText.y = recipeList.y + recipeList.height + 20;
    ticker.container.x = width - ticker.container.width - 10;
    ticker.container.y = recipeList.y + recipeList.height + 20;
    ticker.setValue(initialItemaToCraft);
  }

  function updateCraftButtonPosition() {
    craftButton.x = (width - craftButton.width) / 2;
    craftButton.y = craftItemsText.y + craftItemsText.height + 20;
  }

  function setMaterial(itemId) {
    item = defines.getItemById(itemId);
    initialItemaToCraft = state.get('workbench.itemsToCraft') || 1;

    //Item name
    var tName = utils.wrapper(item.name, {width: 20});
    nameText.text = tName;
    nameText.x = (width - nameText.width) / 2;

    updateImage(item);
    updateCurrentItems(item.id);
    updateRecipe(item.recipe);
    updateTickerPosition();
    updateCraftButtonPosition();
  }

  return {
    width: container.width,
    container: container,
    setMaterial: setMaterial
  };
}