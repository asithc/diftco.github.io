
/**
 * Module dependecies
 */

var Link = ReactRouter.Link;
var Navigation = ReactRouter.Navigation;
var Reflux = require('reflux');
var MasonryMixin = require('../components/masonry-mixin.jsx');
var ProjectsStore = require('../stores/projects-store');

/**
 * Projects Handler
 */

var ProjectsHandler = React.createClass({

  mixins: [
    Reflux.connect(ProjectsStore),
    Navigation
  ],

  getInitialState: function() {
    return {
      projects: ProjectsStore.getProjects()
    };
  },

  onProjectClick: function(e) {
    var path = e.target.querySelector("a").pathname;
    this.transitionTo(path);
  },

  render: function() {
    var createItem = function(item, i) {
      return (
        <div className="grid-item">
          <img 
            src={item.img.low} 
            data-src={item.img.high} 
            className="lazyload" />

          <div className="grid-item-content">
            <h3>
              <Link to={item.href}>{item.title}</Link>
            </h3>
            <p>{item.desc}</p>
          </div>
        </div>
        )
    };

    return (
      <div onClick={this.onProjectClick} className="projects-grid">
        {this.state.projects.map(createItem)}
      </div>
    );
  }
});

module.exports = ProjectsHandler;
