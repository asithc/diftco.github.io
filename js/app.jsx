
/**
 * Module dependencies
 */

var React = require('react');
var Router = require('react-router');
var Sticky = require('react-sticky');
var RouteHandler = Router.RouteHandler;
var Route = Router.Route;
var Link = Router.Link;
var Reflux = require('reflux');
var AppStore = require('./stores/app-store');
var actions = require('./actions');
var TeamView = require('./views/team.jsx');
var ProductsView = require('./views/products.jsx');
var MixedView = require('./views/mixed.jsx');
var DetailsView = require('./views/details.jsx');
var Nav = require('./components/nav.jsx');
var fastclick = require('fastclick');

/**
 * include lazysizzes
 */

require('lazysizes');

/**
 * Load twitter widgets js
 */

require('./lib/twitter-widget');

var TopNavBar = React.createClass({

  events: ['load', 'scroll', 'resize', 'touchmove', 'touchend'],

  getInitialState: function() {
    return {
      isClosed: true
    };
  },

  componentDidMount: function() {

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
    var h = $(this.getDOMNode()).height();

    if (scrollTop > ( 50 + 10 ) ) {
      if (this.state.isClosed) {
        this.setState({ isClosed: false });
      }
    } else if (!this.state.isClosed) {
      this.setState({ isClosed: true });
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

  render: function() {
    var isClosed = this.state.isClosed;

    classes = "navbar navbar-fixed-top";

    if (isClosed) {
      classes += " closed";
    }

    return (
      <nav id="top-navbar" className={classes}>
        <div className="container-fluid">

          <div className="navbar-header">
            <button 
              type="button" 
              className="navbar-toggle collapsed" 
              data-toggle="collapse" 
              data-target="#bs-example-navbar-collapse-1" 
              aria-expanded="false">

              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

            <Link
              className="navbar-brand"
              to="work">DIFT.CO</Link>

          </div>

          <div 
            class="collapse navbar-collapse" 
            id="bs-example-navbar-collapse-1">

            <Nav 
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

/**
 * LangSelector
 */

var LangSelector = React.createClass({

  changeLanguage: function(e) {
    e.preventDefault();
    e.stopPropagation();

    var lang = e.target.innerHTML.toLowerCase();

    actions.changeLang(lang);
  },

  render: function() {
    var lang = this.props.lang;
    var esClass = lang === 'es' ? 'active' : null;
    var enClass = lang === 'en' ? 'active' : null;

    var classes = 'lang-selector nav nav-pills ' + 
      (this.props.extraClasses || '');

    return (
      <ul className={classes}>
        <li className={esClass}> 
          <a href="" onClick={this.changeLanguage}>ES</a>
        </li> 
        <li className={enClass}> 
        <a href="" onClick={this.changeLanguage}>EN</a>
        </li>
      </ul>
    );
  
  }

});

/**
 * App component
 */

var App = React.createClass({

  mixins: [ 
    Reflux.connect(AppStore),
    Route.State
  ],

  render: function() {
    return (
    <div className="container">

      <TopNavBar 
        items={this.state.nav} 
        lang={this.state.lang} />

      <div id="header" className="row">
        <div className="col-md-12">

          <div className="pull-left">
            <h1>COLLECTIVE <br /> DIGITAL <br /> CRAFT</h1>
          </div>
                     
          <LangSelector lang={this.state.lang} />

        </div>
      </div>

      <div id="main-copy" className="row">
        <div className="col-md-7">
          <p>{this.state.content.p1}</p>
          <p>{this.state.content.p2}</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">

          <Nav id="main-nav" items={this.state.nav} />

        </div>
      </div>

      <div id="content">
        <RouteHandler />
      </div>

      <div className="footer row">

        <div className="social col-sm-3">
          <h4>FOLLOW US</h4>
          <ul>
            <li><a href="https://www.linkedin.com/company/dift-collective/" target="_blank">LINKEDIN</a></li>
            <li><a href="https://www.facebook.com/DiftCollective/" target="_blank">FACEBOOK</a></li>
            <li><a href="https://twitter.com/diftcollective" target="_blank">TWITTER</a></li>
          </ul>
        </div>

        <div className="col-sm-3">
          <h4>BUENOS AIRES</h4>
          <ul>
            <li>Conesa 1051</li>
            <li>Buenos Aires, CP 4020</li>
            <li>Tel. +5411.4444.4444</li>
          </ul>
        </div>

        <div className="col-sm-3">
          <h4>CONTACT</h4>
          <ul>
            <li><a href="mailto:newbiz@dift.co">newbiz@dift.co</a></li>
          </ul>
        </div>

        <div className="col-sm-3">
          <h4>©</h4>
          <ul>
            <li>Copyright Dift.co</li>
            <li>2014-2015</li>
          </ul>
        </div>

      </div>
    </div>
    )
  }
});

var routes = (
  <Route name="app" path="/" handler={App} ignoreScrollBehavior={true}>

    <Route name="work" path="/" handler={MixedView} ignoreScrollBehavior={true} />

    <Route name="team" path="/team/" handler={TeamView} ignoreScrollBehavior={true} />

    <Route name="products" path="/products/" handler={ProductsView} ignoreScrollBehavior={true} />

    <Route name="product_details" path="/products/:name/" handler={DetailsView} ignoreScrollBehavior={true} />

  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {  
  React.render(<Handler/>, document.getElementById('app'));
});


/**
 * Fast click for mobile browsers
 */

$(function() {
  fastclick.FastClick.attach(document.body);
});
