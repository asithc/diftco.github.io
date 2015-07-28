
/**
 * Module dependencies
 */

var _ = require('lodash');
var Reflux = require('reflux');
var Actions = require('../actions');

/**
 * Default lang
 */

var language = require('../lib/lang')();

/**
 * App data
 */

var data = {
  'es': require('../../es'),
  'en': require('../../en')
};

/**
 * Projects store
 */

var ProjectsStore = Reflux.createStore({

  listenables: [ Actions ],

  init: function() {
    this.lang = language;
    this.type = null;
  },

  changeLang: function(lang) {
    this.lang = lang;

    this.trigger({projects: this.getProjects()});
  },

  setProjectsType: function(type) {
    this.type = type;
  },

  unsetProjectsType: function() {
    this.type = null;
  },

  getProjects: function(type) {
    type = type || this.type;

    //var projects = this.projects = this.projects || _.shuffle(data[this.lang].projects);
    var projects = data[this.lang].projects;

    if (!this.type) {
      return projects;
    }

    return projects.filter(function(p) {
      return p.type === type;
    });
  }

});

module.exports = ProjectsStore;
