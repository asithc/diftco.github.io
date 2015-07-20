
/**
 * Module dependencies
 */

var Reflux = require('reflux');
var actions = require('./actions');

var data = {
  'es': require('../es'),
  'en': require('../en')
};

/**
 * Browser lang
 */

var defaultLanguage = 'en';
var language = (localStorage.getItem('lang') || navigator.userLanguage || navigator.language).split('-')[0] || defaultLanguage;

/**
 *
 */

module.exports = Reflux.createStore({

  listenables: [actions],

  init: function() {
    console.log('initializing store with %s as lang', language);
    this.lang = language;
  },

  changeLang: function(lang) {
    console.log('store.onChangeLang');

    localStorage.setItem('lang', lang);

    this.lang = lang;
    this.trigger(data[lang]);
  },

  getInitialState: function() {
    var d = data[this.lang];

    return d;
  }
});

