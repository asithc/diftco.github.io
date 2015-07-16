
/**
 * Module dependecies
 */

var MasonryMixin = require('./masonry-mixin.jsx');


/**
 * Team Handler
 */

var TeamHandler = React.createClass({

  mixins: [MasonryMixin()],

  getInitialProps: function() {
    return { 
      data: {
        items: []
      }
    };
  },

  render: function() {
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
        {this.props.data.items.map(createItem)}
      </div>
    );
  }
});

module.exports = TeamHandler;

