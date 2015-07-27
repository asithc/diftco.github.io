
/**
 * Module dependecies
 */

var Reflux = require('reflux');
var TeamStore = require('../stores/team-store');
var MasonryMixin = require('../components/masonry-mixin.jsx');

/**
 * Team View
 */

var TeamView = React.createClass({

  mixins: [
    Reflux.connect(TeamStore),
    //MasonryMixin()
  ],

  getInitialState: function() {
    return {
      team: TeamStore.getFullTeam()
    };

    //Actions.unsetProjectName();
  },

  render: function() {
    var createItem = function(item, i) {
      return (
        <div className="grid-item text-center">
          <img 
            src={item.img.low} 
            data-src={item.img.high} 
            className="lazyload" />

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

module.exports = TeamView;

