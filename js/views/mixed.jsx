
/**
 * Module dependencies
 */

var React = require('react');
var Reflux = require('reflux');
var ProjectsView = require('./projects.jsx');
var ProjectsStore = require('../stores/projects-store');

/**
 * Mixed view
 */

var MixedView = React.createClass({

  mixins: [
    Reflux.connect(ProjectsStore)
  ],

  getInitialState: function() {
    var items = ProjectsStore.getProjects();

    return {
      projects: items 
    };

  },

  render: function() {
    return (
      <ProjectsView items={this.state.projects} />
    );
  }
});

/**
 * Expose view
 */

module.exports = MixedView;
