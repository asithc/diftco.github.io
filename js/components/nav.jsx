
/**
 * Module dependencies
 */

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

/**
 * Nav item component
 */

var NavItem = React.createClass({

  mixins: [ Router.State ],

  getDefaultProps: function() {
    return {
      params: {},
      query: {}
    };
  },

  handleClick: function(e) {
    this.props.onSelected(this.props.name);
  },

  isRouteActive: function(name) {
    var pth = this.getPathname();

    if (~pth.indexOf(name)) {
      return true;
    }

    return this.isActive(name, 
        this.props.params, this.props.query);
  },

  render: function() {
    var className = this.isRouteActive(this.props.name) ? 'active' : null;

    return (
      <li className={className}>
        <Link 
          to={this.props.name}
          params={this.props.params}
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

  className: 'site-nav',

  getInitialState: function() {
    return {};
  },

  onNavItemSelected: function(name) {
    this.setState({ activeItem: name });
  },

  render: function() {
    var self = this;
    var activeItem = this.state.activeItem || this.props.activeItem;

    var createItem = function(item, i) {
      var params = item.params || {};

      return React.createElement(NavItem, {
        name: item.name,
        title: item.title,
        params: params,
        active: activeItem === item.name,
        onSelected: self.onNavItemSelected
      });
    };
  
    var classes = this.className + " nav " +
      (this.props.extraClasses || '');

    return (
      <ul 
        id={this.props.id} 
        style={this.props.style} 
        className={classes}>
        {this.props.items.map(createItem)}
      </ul>
    );
  }

});


module.exports = Nav;

