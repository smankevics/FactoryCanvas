'use strict';

var PIXI = require('pixi.js');

var defines = require('defines');
var RecipeItem = require('../components/RecipeItem');

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

  //Recipe
  var recipe = new PIXI.Text('Recipe', {fontFamily : 'Calibri', fontSize: 16, fontWeight: 'bold', fill : 0x222222});
  recipe.x = 10;
  recipe.y = iconBg.y + iconBg.height + 20;
  container.addChild(recipe);

  //Recipe list
  var recipeList;

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

  function updateRecipe(item) {
    if(recipeList)
      recipeList.destroy({children: true});
    
    recipeList = new PIXI.Container();
    recipeList.x = 5;
    recipeList.width = width - 10;
    recipeList.y = recipe.y + 10;
    
    var rh = 15;
    item.recipe.forEach(function(ni) {
      var res = new RecipeItem(rh, width, ni[0], ni[1]);
      rh += res.container.height;
      recipeList.addChild(res.container);
    });
    container.addChild(recipeList);
  }

  function setMaterial(itemId) {
    var item = defines.getItemById(itemId);

    updateImage(item.name);
    updateRecipe(item);

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