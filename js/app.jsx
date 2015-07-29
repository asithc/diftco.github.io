
/**
 * Module dependencies
 */

var Router = ReactRouter;
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
 * App component
 */

var App = React.createClass({

  mixins: [ Reflux.connect(AppStore) ],

  changeLanguage: function(e) {
    e.preventDefault();
    e.stopPropagation();

    var lang = e.target.innerHTML.toLowerCase();

    actions.changeLang(lang);
  },

  render: function() {
    var esClass = this.state.lang === 'es' ? 'active' : null;
    var enClass = this.state.lang === 'en' ? 'active' : null;

    return (
    <div className="container">
      <div id="main-wrapper">


        <div id="header" className="row">
          <div className="col-md-12">
            <div className="pull-left">
              <h1>COLLECTIVE <br /> DIGITAL <br /> CRAFT</h1>
            </div>
            <ul className="lang-selector nav nav-pills pull-right">
              <li className={esClass}> 
                <a href="" onClick={this.changeLanguage}>ES</a>
              </li> 
              <li className={enClass}> 
              <a href="" onClick={this.changeLanguage}>EN</a>
              </li>
            </ul>
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
            <Nav 
              elementId="main-nav"
              items={this.state.nav} />
          </div>
        </div>

      </div>

      <RouteHandler />

      <footer>
        <p className="brand">© 2015 <a href="http://dift.co">Dift.co</a></p>
        <p className="links">
          <a href="https://www.linkedin.com/company/dift-collective/" target="_blank">LINKEDIN</a>&nbsp;
          <a href="https://www.facebook.com/DiftCollective/" target="_blank">FACEBOOK</a>&nbsp;
          <a href="https://twitter.com/diftcollective" target="_blank">TWITTER</a>
        </p>
      </footer>
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
