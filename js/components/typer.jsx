/** @jsx React.DOM */

var React = require('react');
var typish = require('typish');

/**
 *
 */

var Typer = React.createClass({

  getDefaultProps: function() {

    return {
      content: '',
      onEnd: function() {},
    };
  
  },

  build: function() {
    var node = this.refs.typer.getDOMNode();

    return this.t || typish(node);
  },

  //shouldComponentUpdate: function() {
  //  return false;
  //},

  start: function() {
    var self = this;

    console.log('start');

    if (this.running) {
      return;
    }

    this.running = true;

    this.t
     .type(this.props.content)
     .wait(30)
     .clear()
     .then(function() {
        self.running = false;
        self.onTypeEnd();
      });
  },

  onTypeEnd: function() {
    this.props.onEnd();
  },

  componentDidMount: function() {
    console.log('Typer did mount - running: ', this.running);
    this.t = this.build();
  },

  componentWillUnmount: function() {
    console.log('Typer will unmount');
  },

  componentDidUpdate: function() {
    console.log('Typer did update');
    this.start();
  },

  render: function() {

    return (
      <span>
        <span className="typer" ref="typer"></span> 
        <span className="typer-cursor">|</span>
      </span>
    );
  }

});

module.exports = Typer;
