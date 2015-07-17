
/**
 * Module dependencies
 */

var Router = ReactRouter;
var RouteHandler = Router.RouteHandler;
var Route = Router.Route;
var Link = Router.Link;
var TeamHandler = require('./team-handler.jsx');
var ProjectsHandler = require('./projects-handler.jsx');

/**
 * Page data per lang
 */

var pageData = {
  'es': require('../../es'),
  'en': require('../../en')
};

/**
 * Browser lang
 */

var defaultLanguage = 'en';
var language = (localStorage.getItem('lang') || navigator.userLanguage || navigator.language).split('-')[0] || defaultLanguage;

/**
 * Nav item component
 */

var NavItem = React.createClass({

  handleClick: function(e) {
    this.props.onSelected(this.props.uid);
  },

  render: function() {
    var className = this.props.active ? 'active' : null;

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

  mixins: [ Router.State ],

  getInitialState: function() {
    var data = pageData[language];
    data.lang = language;

    return data; 
  },

  getActiveRouteName: function() {
    var items = this.state.nav;

    for (var i=0,len=items.length; i<len; i++) {
      var uid = items[i].uid;
      if (this.isActive(uid)) {
        return uid;
      }
    }
  },

  getHandlerProps: function() {
    var routeName = this.getActiveRouteName();
    var ret = {};

    console.log('active route', routeName);

    switch(routeName) {
      case 'work':
        ret.items = this.state.projects;
        break;
      case 'team':
        ret.items = this.state.team;
        break;
    }

    return ret;
  },

  changeLanguage: function(e) {
    e.preventDefault();
    e.stopPropagation();
    var lang = e.target.innerHTML.toLowerCase();

    var data;

    switch(lang) {
      case 'es':
        data = pageData.es;
        break;
      case 'en':
        data = pageData.en;
    }

    localStorage.setItem('lang', lang);
    data.lang = lang;

    this.setState(data);

    return false;
  },

  render: function() {
    var handlerProps = this.getHandlerProps();
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
            <Nav 
              activeItem={this.getActiveRouteName()} 
              items={this.state.nav} />
          </div>
        </div>

      </div>

      <RouteHandler data={handlerProps} />

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
    <Route name="work" path="/" handler={ProjectsHandler} />
    <Route name="team" path="/team/" handler={TeamHandler} />
  </Route>
);

// Router.HistoryLocation
Router.run(routes, Router.HistoryLocation, function (Handler) {  
  React.render(<Handler/>, document.getElementById('app'));
});

