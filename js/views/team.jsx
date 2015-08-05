
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

  componentDidMount: function() {
    window.teamLoaded = true;
  },

  render: function() {
    var loaded = window.teamLoaded;

    var createItem = function(item, i) {
      var twitterUrl = "http://twitter.com/" + item.twitter;

      return (
        <div className="grid-item text-center">
          <img 
            src={loaded ? item.img.high : item.img.low} 
            data-src={item.img.high} 
            className={loaded ? "" : "lazyload"} />

          <div className="wrapper">
            <div className="grid-item-content">
              <h4>{item.fullName}</h4>
              <ul>
                <li>{item.roles}</li>
                <li><a href={twitterUrl} target="_blank">@{item.twitter}</a> | 
                <a href={item.linkedin} target="_blank">linkedin</a></li>
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

