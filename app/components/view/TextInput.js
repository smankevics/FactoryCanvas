'use strict';

var PIXI = require('pixi.js');

var utils = require('utils');

module.exports = function (width, height) {
	var container = new PIXI.Container();
	container.interactive = true;
	container.width = width;
	container.height = height;

	var bg = new PIXI.Graphics();
  bg.beginFill(0xffffff);
  bg.drawRect(0, 0, width, height);
  container.addChild(bg);

	var value = '';
	var maxLength = 20;

	var text = new PIXI.Text(value, {fontFamily : 'Calibri', fontSize: 24, fontWeight: 'bold', fill : 0x222222});
	text.x = 5;
	container.addChild(text);

	function add(ch) {
		if(!ch || value.length >= maxLength)
			return;

		value += ch;
		text.text = value;
	}

	function backspace() {
		value = value.slice(0, -1);
		text.text = value;
	};

	function keyInput(e) {
		e = e || window.event;

		e.preventDefault();
		e.stopPropagation();
		if (e.which === 8) {
			backspace();
		} else {
			add(utils.getChar(e));
		}
	};

	document.addEventListener('keydown', keyInput);

	container.removeListener = function() {
		document.removeEventListener('keydown', keyInput);
	}
	container.getValue = function() {
		return value;
	}

	return container;
}