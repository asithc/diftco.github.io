

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
 * Product store
 */

module.exports = Reflux.createStore({
  listenables: [ actions ],

  init: function() {
    this.lang = language;
    this.itemName = null;
  },

  setItemName: function(name) {
    console.log('set item name', name);
    this.itemName = name;

    //this.trigger(this.getItem());
  },

  changeLang: function(lang) {
    this.lang = lang;

    this.trigger(this.getItem());
  },

  getItem: function(name) {
    var n = this.itemName || name;
    var d = data[this.lang];

    var project = d.projects.filter(function(p) {
      return p.name == n;
    })[0];

    return project;
  },

  //getInitialState: function() {
  //  console.log('get initial state = product');
  //  return {};
  //}
});

