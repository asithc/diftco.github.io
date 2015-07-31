
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
    var team = data[this.lang].team;

    return team;
  }

});

