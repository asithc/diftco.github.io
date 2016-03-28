
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

var ContentStore = require('./stores/content-store');
var NavStore = require('./stores/nav-store');

var actions = require('./actions');

var TeamView = require('./views/team.jsx');
var ProductsView = require('./views/products.jsx');
var MixedView = require('./views/mixed.jsx');
var HomeView = require('./views/home.jsx');
var ContactView = require('./views/contact.jsx');
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
    Reflux.connect(ContentStore),
    Reflux.connect(NavStore),
    Router.State
  ],

  getInitialState: function() {
    return {
      overlayVisible: false,
      contentActive: false,
      routeName: null
    };
  },

  handleMenuClick: function() {
    this.setState({ overlayVisible: true });
  },

  handleMenuClose: function() {
    this.setState({ overlayVisible: false });
  },

  render: function() {
    var contentActiveClass = this.state.contentActive ? 
      'active' : null;

    var hideFooter = this.isActive('contact');

    return (
    <div id="main-container" className="container">

      <OverlayMenu 
        items={this.state.nav} 
        visible={this.state.overlayVisible}
        lang={this.state.lang}
        onClose={this.handleMenuClose} />

      <div id="header" className="row">
        <div className="col-md-12">

          <div className="pull-left">
            <h1 id="main-logo">COLLECTIVE <br /> DIGITAL <br /> CRAFT</h1>
          </div>
                     
          <LangSelector lang={this.state.lang} />

        </div>
      </div>
      <div id="content" className={contentActiveClass}>
        <RouteHandler />
      </div>

      <div className={ "footer row" + (hideFooter ? " hidden" : "") }>

        <div className="social col-sm-3">
          <h4>FOLLOW US</h4>
          <ul>
            <li><a href="https://www.linkedin.com/company/dift-collective/" target="_blank">Linkedin</a></li>
            <li><a href="https://www.facebook.com/DiftCollective/" target="_blank">Facebook</a></li>
            <li><a href="https://twitter.com/diftcollective" target="_blank">Twitter</a></li>
          </ul>
        </div>

        <div className="col-sm-3">
          <h4>BUENOS AIRES</h4>
          <ul>
            <li>Conesa 1051</li>
            <li>Buenos Aires, CP 4020</li>
            <li><a href="tel:+541139623000">Tel. +5411.3962.3000</a></li>
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
  },

  componentDidMount: function() {
    var self = this;

    setTimeout(function() {
      self.setState({ contentActive: true });
    }, 300);
  }
});

var routes = (
  <Route name="app" path="/" handler={App} ignoreScrollBehavior={true}>
    <Route name="home" path="/" handler={HomeView} 
      ignoreScrollBehavior={true} />
    <Route name="team" path="/team/" handler={TeamView} 
      ignoreScrollBehavior={true} />
    <Route name="products" path="/products/" handler={ProductsView} 
      ignoreScrollBehavior={true} />
    <Route name="product_details" path="/products/:name/" 
      handler={DetailsView} ignoreScrollBehavior={true} />
    <Route name="contact" path="/contact/" 
      handler={ContactView} ignoreScrollBehavior={true} />
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
