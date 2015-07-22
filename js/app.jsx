
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
var ProjectsView = require('./views/projects.jsx');
var DetailsView = require('./views/details.jsx');

/**
 * Nav item component
 */

var NavItem = React.createClass({

  mixins: [ Router.State ],

  handleClick: function(e) {
    this.props.onSelected(this.props.uid);
  },

  isRouteActive: function(uid) {
    var name = uid;
    var pth = this.getPathname();

    if (~pth.indexOf(uid)) {
      return true;
    }

    return this.isActive(name);
  },

  render: function() {
    var className = this.isRouteActive(this.props.uid) ? 'active' : null;

    return (
      <li className={className}>
        <Link 
          to={this.props.uid}
          onClick={this.handleClick}>
            {this.props.title}
        </Link>
      </li>
    );
  }
});

/**
 * Nav component
 */

var Nav = React.createClass({

  getInitialState: function() {
    return {};
  },

  onNavItemSelected: function(uid) {
    this.setState({ activeItem: uid });
  },

  render: function() {
    var self = this;
    var activeItem = this.state.activeItem || this.props.activeItem;

    var createItem = function(item, i) {
      return React.createElement(NavItem, {
        uid: item.uid,
        title: item.title,
        active: activeItem === item.uid,
        onSelected: self.onNavItemSelected
      });
    };
  
    return (
      <ul id="main-nav" className="nav nav-pills">
        {this.props.items.map(createItem)}
      </ul>
    );
  }

});


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

        <div className="row">
          <div className="col-md-12">
            <ul className="lang-selector pull-right">
              <a className={esClass} href="" onClick={this.changeLanguage}>ES</a> |&nbsp;
              <a className={enClass} href="" onClick={this.changeLanguage}>EN</a>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h1>{this.state.content.title}</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-7">
            <p>{this.state.content.p1}</p>
            <p>{this.state.content.p2}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Nav items={this.state.nav} />
          </div>
        </div>

      </div>

      <RouteHandler />

      <footer>
        <p>© 2015 <a href="http://dift.co">Dift.co</a></p>
        <p>
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
  <Route name="app" path="/" handler={App}>
    <Route name="work" path="/" handler={ProjectsView} />
    <Route name="team" path="/team/" handler={TeamView} />
    <Route name="products" path="/products/" handler={ProjectsView} />
    <Route name="product_details" path="/products/:name/" handler={DetailsView} />
  </Route>
);

// Router.HistoryLocation
Router.run(routes, Router.HistoryLocation, function (Handler) {  
  React.render(<Handler/>, document.getElementById('app'));
});

