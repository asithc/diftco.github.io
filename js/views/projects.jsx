
/**
 * Module dependecies
 */

var Link = ReactRouter.Link;
var Navigation = ReactRouter.Navigation;
var Reflux = require('reflux');

/**
 * Projects View
 */

var ProjectsHandler = React.createClass({

  mixins: [
    Navigation
  ],

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
          <div className="wrapper">
            <img 
              src={item.img.low} 
              data-src={item.img.high} 
              className="lazyload" />

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
