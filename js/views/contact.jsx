
/**
 * Module dependecies
 */

var React = require('react');
var Reflux = require('reflux');
//var ContentStore = require('../stores/content-store');

/**
 * Contact View
 */

var ContactView = React.createClass({

  mixins: [
    //Reflux.connect(ContentStore),
  ],

  render: function() {

    return (
      <div id="contact">

        <div className="row">
          <div className="col-sm-4">
            <h4>BUENOS AIRES</h4>
            <ul>
              <li>Conesa 1051</li>
              <li>Buenos Aires, CP 4020</li>
              <li><a href="tel:+541139623000">Tel. +5411.3962.3000</a></li>
            </ul>
          </div>

          <div className="col-sm-4">
            <h4>CONTACT</h4>
            <ul>
              <li><a href="mailto:newbiz@dift.co">newbiz@dift.co</a></li>
            </ul>
          </div>

          <div className="col-sm-4">
            <h4>FOLLOW US</h4>
            <ul>
              <li><a href="https://www.linkedin.com/company/dift-collective/" target="_blank">Linkedin</a></li>
              <li><a href="https://www.facebook.com/DiftCollective/" target="_blank">Facebook</a></li>
              <li><a href="https://twitter.com/diftcollective" target="_blank">Twitter</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ContactView;


