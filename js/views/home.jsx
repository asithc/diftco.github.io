
/**
 * Module dependecies
 */

var React = require('react');
var Reflux = require('reflux');
var ContentStore = require('../stores/content-store');

/**
 * Home View
 */

var HomeView = React.createClass({

  mixins: [
    Reflux.connect(ContentStore),
  ],

  componentDidMount: function() {
    var variations = this.state.content.p2.variations;

    console.log('componentDidMount', variations);

    var node = this.refs.typed.getDOMNode();
    setTimeout(function() {
      $(node).typed({
        strings: variations,
        loop: true,
        typeSpeed: 50,
        startDelay: 1000,
        backDelay: 3000
      });
    }, 2000);

  },

  render: function() {

    return (
      <div id="home">
        <div className="wrapper">
          <p>{this.state.content.p1}</p>
          <p>
            {this.state.content.p2.main}
            <span ref="typed">{this.state.content.p2.variations[1]}</span>
          </p>
        </div>
      </div>
    );
  }
});

module.exports = HomeView;

