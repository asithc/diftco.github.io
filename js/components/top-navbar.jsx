
/**
 * Module dependencies
 */

var React = require('react');
var Nav = require('./nav.jsx');
var LangSelector = require('./lang-selector.jsx');
var Router = require('react-router');
var Link = Router.Link;

/**
 * Top Navbar 
 */

var TopNavBar = React.createClass({

  events: [
    'load', 
    'scroll', 
    'resize', 
    'touchmove', 
    'touchend'
  ],

  getInitialState: function() {
    return {
      isClosed: true,
      showMainMenu: false
    };
  },

  componentDidMount: function() {
    var $menu = $('#main-nav');
    this.menuOffset = $menu.offset().top;

    var $brand = $('#main-logo');
    this.brandOffset = $brand.offset().top + $brand.height() - 30;

    this.events.forEach(function(type) {
      window.addEventListener(type, this.handleEvent);
    }, this);

    this.tick();
  },

  componentWillUnmount: function() {

    this.events.forEach(function(type) {
      window.removeEventListener(type, this.handleEvent);
    }, this);
    this.cancel();
  },

  top: function() {
    return this.getDOMNode().getBoundingClientRect().top;
  },

  handleTick: function() {
    var scrollTop = $(window).scrollTop();
    //var h = $(this.getDOMNode()).height();

    if (scrollTop > this.brandOffset) {
      if (this.state.isClosed) {
        this.setState({ isClosed: false });
      }
    } else if (!this.state.isClosed) {
      this.setState({ isClosed: true });
    }

    if (scrollTop > this.menuOffset) {

      if (!this.state.showMainMenu) {
        this.setState({ showMainMenu: true });
      }

    } else if (this.state.showMainMenu) {
      this.setState({ showMainMenu: false });
    }

    this.tick();
  },

  handleEvent: function(event) {

    switch (event.type) {
      case 'touchmove':
        this.hasTouchEvent = true;
        break;
      case 'touchend':
        this.hasTouchEvent = false;
        break;
      default:
        this.hasUnhandledEvent = true;
    }

  },

  tick: function () {
    var next = window.requestAnimationFrame || setTimeout;
    this.currentTick = next(this.handleTick, 1000 / 60);
  },

  cancel: function() {
    var cancel =  window.cancelAnimationFrame || clearTimeout;
    cancel(this.currentTick);
  },

  handleMenuClick: function() {
    console.log('hahahaha', this.props);

    if (this.props.onMenuClick) {
      this.props.onMenuClick();
    }
  
  },

  render: function() {
    var isClosed = this.state.isClosed;

    classes = "navbar navbar-fixed-top navbar-default";

    var brandStyle = {};
    if (isClosed) {
      classes += " closed";
    } else {
      brandStyle = { bottom: 0 };
    }

    var mainMenuStyle = { };

    if (this.state.showMainMenu) {
      mainMenuStyle = { bottom: 0 };
    }

    return (
      <nav id="top-navbar" className={classes}>
        <div className="container">

          <div className="navbar-header">

            <button type="button" 
              className="navbar-toggle" 
              onClick={this.handleMenuClick}>

              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

            <Link
              className="navbar-brand"
              style={brandStyle}
              to="home">DIFT.CO</Link>

              {this.state.section}

          </div>

          <div class="collapse navbar-collapse">

            <Nav 
              style={mainMenuStyle}
              items={this.props.items} 
              extraClasses="navbar-nav" />

            <LangSelector 
              lang={this.props.lang}
              extraClasses="navbar-right navbar-nav" />

          </div>

        </div>
      </nav>
    );
  }

});

module.exports = TopNavBar;
