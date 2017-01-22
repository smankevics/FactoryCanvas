'use strict';
var PIXI = require('pixi.js');
var utils = require('utils');

module.exports = function(_x, _y, _width, onChange, initialValue) {
  var width = _width;
  var container = new PIXI.Container();
  container.x = _x;
  container.y = _y;

  var tickerValue = initialValue || 0;
  var pressTimeout;
  var pressCycle = 1;
  var minValue = 0;
  var maxValue;

  function updateTicker(inc) {
    if((!inc && tickerValue === minValue) || (inc && _.isNumber(maxValue) && tickerValue === maxValue))
      return;

    if(inc) 
      tickerValue++;
    else
      tickerValue--;

    onChange(tickerValue);
    updateTickerValue();
      
    if(tickerValue > 0) {
      if(pressTimeout)
        clearTimeout(pressTimeout);
      pressTimeout = setTimeout(function(){updateTicker(inc)}, 200 / pressCycle);

      if(pressCycle < 10)
        pressCycle++;
    }
  }

  function updateTickerValue() {
    var value = tickerValue > 0 ? tickerValue+'' : '';
    valueText.text = value;
    valueText.x = (width - valueText.width) / 2;
    valueText.y = 0;
  }

  function releaseTicker() {
    clearTimeout(pressTimeout);
    pressCycle = 1;
  }

  //decrease button
  var btGr1 = new PIXI.Container();
  btGr1.x = 0;
  btGr1.y = 0;
  btGr1.width = 16;
  btGr1.height = 16;
  btGr1.buttonMode = true;
  btGr1.interactive = true;
  btGr1.on('mousedown', function() {
    updateTicker(false);
  });
  btGr1.on('touchstart', function() {
    updateTicker(false);
  });
  btGr1.on('touchend', releaseTicker);
  btGr1.on('touchendoutside', releaseTicker);
  btGr1.on('mouseup', releaseTicker);
  btGr1.on('mouseupoutside', releaseTicker);
  var btGr1bg = new PIXI.Graphics();
  btGr1bg.beginFill(0xdedede);
  btGr1bg.drawRect(0, 0, 16, 16);
  btGr1.addChild(btGr1bg);
  var dec = new PIXI.Text('-', {fontFamily : 'Calibri', fontSize: 24, fontWeight: 'bold', fill : 0x232323});
  dec.x = (btGr1.width - dec.width) / 2 + 1;
  dec.y = (btGr1.height - dec.height) / 2 - 1;
  btGr1.addChild(dec);
  container.addChild(btGr1);

  var valueText = new PIXI.Text('', {fontFamily : 'Calibri', fontSize: 14, fill : 0x000000});
  updateTickerValue();
  container.addChild(valueText);

  //increase button
  var btGr2 = new PIXI.Container();
  btGr2.x = width - btGr1.width;
  btGr2.y = 0;
  btGr2.width = 16;
  btGr2.height = 16;
  btGr2.buttonMode = true;
  btGr2.interactive = true;
  btGr2.on('mousedown', function() {
    updateTicker(true);
  });
  btGr2.on('touchstart', function() {
    updateTicker(true);
  });
  btGr2.on('touchend', releaseTicker);
  btGr2.on('touchendoutside', releaseTicker);
  btGr2.on('mouseup', releaseTicker);
  btGr2.on('mouseupoutside', releaseTicker);
  var btGr2bg = new PIXI.Graphics();
  btGr2bg.beginFill(0xdedede);
  btGr2bg.drawRect(0, 0, 16, 16);
  btGr2.addChild(btGr2bg);
  var dec = new PIXI.Text('+', {fontFamily : 'Calibri', fontSize: 20, fontWeight: 'bold', fill : 0x232323});
  dec.x = (btGr2.width - dec.width) / 2 + 1;
  dec.y = (btGr2.height - dec.height) / 2;
  btGr2.addChild(dec);
  container.addChild(btGr2);

  function setValue(_value, triggerUpdate) {
    tickerValue = _value;
    updateTickerValue();
    if(triggerUpdate)
      onChange(tickerValue);
  }

  function setMin(_value) {
    minValue = _value;
  }

  function setMax(_value) {
    maxValue = _value;
  }

  function value() {
    return tickerValue;
  }

  return {
    container: container,
    setValue: setValue,
    value: value,
    setMin: setMin,
    setMax: setMax
  };
};