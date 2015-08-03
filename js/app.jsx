
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
var TopNavBar = require('./components/top-navbar.jsx');
var Nav = require('./components/nav.jsx');
var LangSelector = require('./components/lang-selector.jsx');
var OverlayMenu = require('./components/overlay-menu.jsx');

/**
 * Fastclick plugin
 */

var fastclick = require('fastclick');

/**
 * include lazysizzes
 */

require('lazysizes');

/**
 * Load twitter widgets js
 */

require('./lib/twitter-widget');

/**
 * App component
 */

var App = React.createClass({

  mixins: [ 
    Reflux.connect(AppStore),
    Route.State
  ],

  getInitialState: function() {
    return {
      overlayVisible: false
    };
  },

  handleMenuClick: function() {
    this.setState({ overlayVisible: true });
  },

  handleMenuClose: function() {
    this.setState({ overlayVisible: false });
  },

  render: function() {
    return (
    <div className="container">

      <OverlayMenu 
        items={this.state.nav} 
        visible={this.state.overlayVisible}
        lang={this.state.lang}
        onClose={this.handleMenuClose} />

      <TopNavBar 
        items={this.state.nav} 
        lang={this.state.lang}
        onMenuClick={this.handleMenuClick} />

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

          <nav id="main-navbar" className="navbar">
            <div className="container">
              <Nav id="main-nav" 
                extraClasses="navbar-nav"
                items={this.state.nav} />
            </div>
          </nav>

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
