
/**
 * Module dependencies
 */

var React = require('react');
var Reflux = require('reflux');
var ProjectsView = require('./projects.jsx');
var ProjectsStore = require('../stores/projects-store');

/**
 * Products view
 */

var ProductsView = React.createClass({

  mixins: [
    Reflux.connect(ProjectsStore)
  ],

  componentWillMount: function() {
    ProjectsStore.setProjectsType('product');
  },

  getInitialState: function() {
    var items = ProjectsStore.getProjects('product');

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

module.exports = ProductsView;
