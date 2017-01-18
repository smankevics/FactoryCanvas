'use strict';
var PIXI = require('pixi.js');

const WIDTH = 60;
const HEIGHT = 20;

module.exports = function(_text, cb) {
  var text = _text;
  var container = new PIXI.Container();
  container.width = WIDTH;
  container.height = HEIGHT;
  container.buttonMode = true;
  container.interactive = true;
  container.on('mouseup', cb);

  var bg = new PIXI.Graphics();
  bg.beginFill(0x993232);
  bg.drawRect(0, 0, WIDTH, HEIGHT);
  container.addChild(bg);

  var name = new PIXI.Text(text, {fontFamily : 'Calibri', fontSize: 14, fontWeight: 'bold', fill : 0xdedede});
  name.x = (WIDTH - name.width) / 2;
  name.y = (HEIGHT - name.height) / 2 - 1;
  container.addChild(name);

  return container
};