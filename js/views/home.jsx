/** @jsx React.DOM */

var React = require('react');
var Reflux = require('reflux');
var ContentStore = require('../stores/content-store');
var typish = require('typish');
var Typer = require('../components/typer.jsx');



/**
 * Home View
 */

var HomeView = React.createClass({

  mixins: [
    Reflux.connect(ContentStore),
  ],

  componentWillMount: function() {
    this.setState({ 
      textToType: this.getNextTextToType() 
    });
  },

  componentDidMount: function() {
  },

  componentWillUnmount: function() {
  },

  componentWillUpdate: function() {
  },

  componentDidUpdate: function() {
  },

  getNextTextToType: function() {
    var variations = this.state.content.p2.variations;

    var i = this.__i || 0;

    this.__i = (i+1) % (variations.length);

    console.log(i, variations);

    return variations[i];
  },

  onTypeEnd: function() {
    var text = this.getNextTextToType();
    console.log('type end', text);

    this.setState({ textToType: text });
  },

  render: function() {

    return (
      <div id="home">
        <div className="wrapper">
          <p>{this.state.content.p1}</p>
          <p>
            {this.state.content.p2.main}

            <span className="typed-text">

              <Typer 
                content={this.state.textToType} 
                onEnd={this.onTypeEnd} />

            </span>

            {/**
               
                {this.state.content.p2.variations[1]}
            **/}
          </p>
        </div>
      </div>
    );
  }
});

module.exports = HomeView;

