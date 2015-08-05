
/**
 * Module dependencies
 */

var Reflux = require('reflux');
var actions = require('../actions');
var language = require('../lib/lang')();

/**
 * Content store
 */

module.exports = Reflux.createStore({

  listenables: [ actions ],

  init: function() {
    
  },

  navigate: function(name) {
    this.trigger({ routeName: name });
  }

});


