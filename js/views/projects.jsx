
/**
 * Module dependecies
 */

var Link = ReactRouter.Link;
var Navigation = ReactRouter.Navigation;
var Reflux = require('reflux');
//var MasonryMixin = require('../components/masonry-mixin.jsx');
var ProjectsStore = require('../stores/projects-store');

/**
 * Projects Handler
 */

var ProjectsHandler = React.createClass({

  mixins: [
    Reflux.connect(ProjectsStore),
    //MasonryMixin({ 
    //  itemSelector: '.grid-item',
    //  //columnWidth: '.grid-sizer',
    //  //gutter: '.gutter-sizer',
    //  percentPosition: true,
    //  transitionDuration: 0
    //}),
    Navigation
  ],

  getInitialState: function() {
    return {
      projects: ProjectsStore.getProjects()
    };
  },

  onProjectClick: function(e) {
    var target = e.target.parentElement;
    var path = target.querySelector("a").pathname;
    this.transitionTo(path);
  },

  render: function() {
    var createItem = function(item, i) {
      var className = "grid-item " + item.name;
      return (

        <div className={className}>
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
      <div ref="masonryContainer" onClick={this.onProjectClick} className="grid projects-grid">
      {/**
        <div className="grid-sizer"></div>
        <div className="gutter-sizer"></div>
      **/}
        {this.state.projects.map(createItem)}
      </div>
    );
  }
});

module.exports = ProjectsHandler;
