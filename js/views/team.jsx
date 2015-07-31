
/**
 * Module dependecies
 */

var React = require('react');
var Reflux = require('reflux');
var TeamStore = require('../stores/team-store');

/**
 * Team View
 */

var TeamView = React.createClass({

  mixins: [
    Reflux.connect(TeamStore),
  ],

  getInitialState: function() {
    return {
      team: TeamStore.getFullTeam()
    };
  },

  render: function() {
    var createItem = function(item, i) {
      return (
        <div className="grid-item text-center">
          <div className="wrapper">
            <img 
              src={item.img.low} 
              data-src={item.img.high} 
              className="lazyload" />

            <div className="grid-item-content">
              <h4>{item.fullName}</h4>
              <ul>
                <li>{item.roles}</li>
                <li><a href="">@{item.twitter}</a> | <a href="">linkedin</a></li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
      )
    };

    return (
      <div className="grid team-grid clearfix">
        {this.state.team.map(createItem)}
      </div>
    );
  }
});

module.exports = TeamView;

