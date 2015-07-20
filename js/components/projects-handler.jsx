
/**
 * Module dependecies
 */

var Reflux = require('reflux');
var MasonryMixin = require('./masonry-mixin.jsx');
var store = require('../store');

/**
 * Projects Handler
 */

var ProjectsHandler = React.createClass({

  mixins: [
    Reflux.connect(store),
    MasonryMixin()
  ],

  render: function() {
    console.log('props', this.props);

    var createItem = function(item, i) {
      return (
        <div className="grid-item">
          <img src={item.img} />
          <div className="grid-item-content">
            <h3>
              <a href={item.href} target="_blank">{item.title}</a>
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
