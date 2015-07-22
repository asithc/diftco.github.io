
/**
 * Module dependencies
 */

var Reflux = require('reflux');
var actions = require('../actions');
var language = require('../lib/lang')();

var data = {
  'es': require('../../es'),
  'en': require('../../en')
};

/**
 * App store
 */

module.exports = Reflux.createStore({

  listenables: [ actions ],

  init: function() {
    this.lang = language;
  },

  changeLang: function(lang) {
    localStorage.setItem('lang', lang);

    this.lang = lang;
    this.trigger(data[lang]);
  },

  getInitialState: function() {
    var d = data[this.lang];

    return d;
  }
});

