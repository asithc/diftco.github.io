
/**
 * Module dependecies
 */

var Link = ReactRouter.Link;
var Reflux = require('reflux');
var MasonryMixin = require('../components/masonry-mixin.jsx');
var ProjectsStore = require('../stores/projects-store');

/**
 * Projects Handler
 */

var ProjectsHandler = React.createClass({

  mixins: [
    Reflux.connect(ProjectsStore),
    MasonryMixin()
  ],

  getInitialState: function() {
    return {
      projects: ProjectsStore.getProjects()
    };
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
      <div ref="masonryContainer" className="grid projects-grid">
        {this.state.projects.map(createItem)}
      </div>
    );
  }
});

module.exports = ProjectsHandler;
