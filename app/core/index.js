'use strict';

module.exports = (function() {
  
  var CoreUtils = require('./coreUtils.js');

  function test() {
    CoreUtils.util();
  }

  return {
    test: test
  }
})();