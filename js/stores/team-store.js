
/**
 * Module dependencies
 */

var Reflux = require('reflux');
var actions = require('../actions');
var language = require('../lib/lang')();
var _ = require('lodash');

var data = {
  'es': require('../../es'),
  'en': require('../../en')
};

/**
 * Team store
 */

module.exports = Reflux.createStore({
  listenables: [ actions ],

  init: function() {
    this.lang = language;
  },

  changeLang: function(lang) {
    this.lang = lang;

    this.trigger({ team: this.getTeamByProject() });
  },

  unsetProjectName: function() {
    this.projectName = null;
  },

  setProjectName: function(name) {
    this.projectName = name;
  },

  getFullTeam: function() {
    this.team = this.team || _.shuffle(data[this.lang].team);
    return this.team;
  },

  getTeamByProject: function(projectName) {
    projectName = projectName || this.projectName;

    var team = this.getFullTeam();

    if (!projectName) {
      return team;
    }

    return team.filter(function(member) {
      return ~member.projects.indexOf(projectName);
    });
  }

});

