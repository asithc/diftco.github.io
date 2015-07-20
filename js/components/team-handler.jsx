
/**
 * Module dependecies
 */

var Reflux = require('reflux');
var store = require('../store');
var MasonryMixin = require('./masonry-mixin.jsx');


/**
 * Team Handler
 */

var TeamHandler = React.createClass({

  mixins: [
    Reflux.connect(store),
    MasonryMixin()
  ],

  render: function() {
    console.log(this.state, this.props);

    var createItem = function(item, i) {
      return (
        <div className="grid-item text-center">
          <img src={item.img} />
          <div className="grid-item-content">
            <h4>{item.fullName}</h4>
            <p>{item.desc}</p>
          </div>
        </div>
      )
    };

    return (
      <div ref="masonryContainer" className="grid team-grid">
        {this.state.team.map(createItem)}
      </div>
    );
  }
});

module.exports = TeamHandler;

