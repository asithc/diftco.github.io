
/**
 * Module dependencies
 */

var React = require('react');
var Nav = require('./nav.jsx');
var LangSelector = require('./lang-selector.jsx');


/**
 * Overlay menu
 */

var OverlayMenu = React.createClass({

  getDefaultProps: function() {
    return {
      visible: false,
      onClose: function() {}
    };
  },

  handleCloseClick: function() {
    this.props.onClose();
  },

  render: function() {

    var style = { 
      display: this.props.visible ? 'block' : 'none',
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      opacity: 0.9,
      backgroundColor: '#000',
      zIndex: 99999
    };

    return (
      <div 
        id="overlay-menu"
        style={style}>

        <div className="header">
          <button 
            type="button" 
            className="close" 
            aria-label="Close"
            onClick={this.handleCloseClick}>

            <span aria-hidden="true">×</span>
          </button>


          <LangSelector 
            lang={this.props.lang} />

        </div>

        <nav className="navbar">
          <div className="container">
            <Nav id="overlay-nav" 
              extraClasses="navbar-nav"
              items={this.props.items} />
          </div>
        </nav>
      
      </div>
    );
  }
});

/**
 * Export module
 */

module.exports = OverlayMenu;
