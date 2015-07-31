

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
 * Product store
 */

module.exports = Reflux.createStore({
  listenables: [ actions ],

  init: function() {
    this.lang = language;
    this.itemName = null;
  },

  setProjectName: function(name) {
    this.itemName = name;
  },

  changeLang: function(lang) {
    this.lang = lang;

    this.trigger({ project: this.getProject() });
  },

  getProject: function(name) {
    var n = name || this.itemName;
    var d = data[this.lang];

    var project = d.projects.filter(function(p) {
      return p.name == n;
    })[0];

    return project;
  }

});

