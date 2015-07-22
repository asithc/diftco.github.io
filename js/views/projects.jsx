
/**
 * Module dependecies
 */

var Link = ReactRouter.Link;
var Reflux = require('reflux');
var MasonryMixin = require('../components/masonry-mixin.jsx');
var store = require('../stores/app-store');

/**
 * Projects Handler
 */

var ProjectsHandler = React.createClass({

  mixins: [
    Reflux.connect(store),
    MasonryMixin()
  ],

  render: function() {
    var createItem = function(item, i) {
      return (
        <div className="grid-item">
          <img src={item.img} />
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
