
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

  handleNavItemSelected: function(name) {
    console.log('selected %s', name);

    this.props.onClose();
  },

  render: function() {
    var active = this.props.visible ? 'active' : null;

    return (
      <div 
        className={active}
        id="overlay-menu">

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

        <div className="wrapper">
          <nav className="navbar">
            <div className="container">

              <Nav id="overlay-nav" 
                extraClasses="navbar-nav"
                items={this.props.items} 
                onItemSelected={this.handleNavItemSelected} />

            </div>
          </nav>
        </div>
      
      </div>
    );
  }
});

/**
 * Export module
 */

module.exports = OverlayMenu;
