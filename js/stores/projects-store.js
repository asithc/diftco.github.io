
/**
 * Module dependencies
 */

var Reflux = require('reflux');
var actions = require('../actions');

/**
 * Default lang
 */

var language = require('../lib/lang')();

/**
 * App data
 */

var data = {
  'es': require('../../data/es'),
  'en': require('../../data/en')
};

/**
 * Projects store
 */

var ProjectsStore = Reflux.createStore({

  listenables: [ actions ],

  init: function() {
    this.lang = language;
    this.type = null;
  },

  changeLang: function(lang) {
    this.lang = lang;

    this.trigger({ projects: this.getProjects() });
  },

  setProjectsType: function(type) {
    this.type = type;
  },

  unsetProjectsType: function() {
    this.type = null;
  },

  getProjects: function(type) {
    type = type || this.type;

    var projects = data[this.lang].projects;

    if (!type) {
      return projects;
    }

    return projects.filter(function(p) {
      return p.type === type;
    });
  }

});

module.exports = ProjectsStore;
