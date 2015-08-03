
/**
 * Module dependecies
 */

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;
var Reflux = require('reflux');

/**
 * Projects View
 */

var ProjectsHandler = React.createClass({

  mixins: [ Navigation ],

  onProjectClick: function(e) {
    var target = e.target.parentElement;
    var path = target.querySelector("a").pathname;
    this.transitionTo(path);
  },

  componentDidMount: function() {
    window.projectsLoaded = true;
  },

  render: function() {
    var loaded = window.projectsLoaded;

    var createItem = function(item, i) {
      var className = "grid-item " + item.name;

      return (
        <div className={className}>
          <div className="wrapper">
            <img 
              src={loaded ? item.img.high : item.img.low} 
              data-src={item.img.high} 
              className={loaded ? "" : "lazyload"} />

            <div className="grid-item-content">
              <h3>
                <Link to={item.href}>{item.title}</Link>
              </h3>
              <p>{item.desc.short}</p>
            </div>
          </div>
        </div>
      )
    };

    var items = this.props.items;

    return (
      <div onClick={this.onProjectClick} className="grid projects-grid">
        {items.map(createItem)}
      </div>
    );
  }
});

module.exports = ProjectsHandler;
