'use strict';

module.exports = {
    toCurrency: function(number) {
        var n;
        if(typeof number === 'number') {
            n = number;
        } else {
            n = Number(number);
        }

        return n.toFixed(2) + '€';
    }
}