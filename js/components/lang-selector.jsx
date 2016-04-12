
/**
 * Module dependencies
 */

var React = require('react');
var actions = require('../actions');


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
      <ul className={classes} style={this.props.style}>
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

module.exports = LangSelector;
