
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
 * Team store
 */

module.exports = Reflux.createStore({
  listenables: [ actions ],

  init: function() {
    this.lang = language;
  },

  changeLang: function(lang) {
    this.lang = lang;

    this.trigger({ team: this.getFullTeam() });
  },

  getFullTeam: function() {
    return data[this.lang].team;
  },

  getTeamByProject: function(projectName) {
    return this.getFullTeam().filter(function(member) {
      return ~member.projects.indexOf(projectName);
    });
  }

});

