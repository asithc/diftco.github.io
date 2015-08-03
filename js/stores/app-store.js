
/**
 * Module dependencies
 */

var Reflux = require('reflux');
var actions = require('../actions');
var language = require('../lib/lang')();

var data = {
  'es': require('../../data/es'),
  'en': require('../../data/en')
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

  changeSection: function(name) {
    this.trigger({ section: name });
  },

  getInitialState: function() {
    var d = data[this.lang];

    return d;
  }

});

