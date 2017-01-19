'use strict';

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
    }
}