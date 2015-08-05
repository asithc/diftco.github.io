
/**
 * Module dependencies
 */

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var actions = require('../actions');

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
    var self = this;

    actions.navigate(this.props.name);
    $('#content').removeClass('active');
    self.props.onSelected(this.props.name);

    setTimeout(function() {
      
      $('#content').addClass('active');
    }, 300);
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
      <li key={this.props.name} className={className}>
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

  getDefaultProps: function() {
    return {
      extraClasses: null,
      items: [],
      onItemSelected: function() {}
    };
  },

  getInitialState: function() {
    return {
    
    };
  },

  handleItemSelected: function(name) {
    this.props.onItemSelected(name);
  },

  render: function() {
    var self = this;

    var createItem = function(item, i) {
      var params = item.params || {};

      return React.createElement(NavItem, {
        name: item.name,
        title: item.title,
        params: params,
        onSelected: self.handleItemSelected
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

