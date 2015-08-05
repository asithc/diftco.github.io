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

  start: function() {
    var self = this;

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
       self.props.onEnd();
     });
  },

  componentDidMount: function() {
    this.t = this.build();
  },

  componentDidUpdate: function() {
    console.log('update');

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
