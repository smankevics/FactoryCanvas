'use strict';

module.exports = function(e) {
  var code = e.which
    , ch = ''
    , ignoredCodes = { //Ignore Shift Key events & arrows
          16: true,
          37: true,
          38: true,
          39: true,
          40: true,
          20: true,
          17: true,
          18: true,
          91: true
      }
    , exceptions = { //These are special cases that don't fit the ASCII mapping
        186: 59, // ;
        187: 61, // =
        188: 44, // ,
        189: 45, // -
        190: 46, // .
        191: 47, // /
        192: 96, // `
        219: 91, // [
        220: 92, // \
        221: 93, // ]
        222: 39  // '
    }
    , special = { //Shift-key characters
          1: '!',
          2: '@',
          3: '#',
          4: '$',
          5: '%',
          6: '^',
          7: '&',
          8: '*',
          9: '(',
          0: ')',
          ',': '<',
          '.': '>',
          '/': '?',
          ';': ':',
          "'": '"',
          '[': '{',
          ']': '}',
          '\\': '|',
          '`': '~',
          '-': '_',
          '=': '+'
      };

  if (ignoredCodes[code] === true) {
      return false;
  }

  if (typeof exceptions[code] != 'undefined') {
    code = exceptions[code];
  }

  ch = String.fromCharCode(code);

  /*** Handle Shift ***/
  if (e.shiftKey) {
      if (typeof special[ch] != 'undefined') {
        ch = special[ch];
      }
  } else {
      ch = ch.toLowerCase();
  }

  return ch;
};