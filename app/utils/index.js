'use strict';

var PIXI = require('pixi.js');
var utils = require('utils');

module.exports = {
    stringCurrency: function(number) {
        var n;
        if(typeof number === 'number') {
            n = number;
        } else {
            n = Number(number);
        }

        return n.toFixed(2) + '€';
    },
    numberCurrency: function(number) {
        var n;
        if(typeof number === 'number') {
            n = number;
        } else {
            n = Number(number);
        }
        return Number(n.toFixed(2));
    },
    Text: function(text, styles, canvas) {
        var text = new PIXI.Text(text, styles, canvas);
        text.style.fontSize = text.style.fontSize * 2;  
        text.dirty = true;  
        text.scale.set(0.5, 0.5);
        return text;
    }
}   