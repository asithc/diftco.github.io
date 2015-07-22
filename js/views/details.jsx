
/**
 * Module dependecies
 */

var Reflux = require('reflux');
var ProductStore = require('../stores/product-store');
var TeamStore = require('../stores/team-store');
var Actions = require('../actions');
var MasonryMixin = require('../components/masonry-mixin.jsx');

/**
 * Details Handler
 */

var DetailsHandler = React.createClass({

  mixins: [
    Reflux.connect(ProductStore),
    Reflux.connect(TeamStore),
    MasonryMixin()
  ],

  getInitialState: function() {
    var name = this.props.params.name;

    return {
      team: TeamStore.getTeamByProject(name),
      project: ProductStore.getItem(name)
    };
  },

  componentDidMount: function() {
    var name = this.props.params.name;

    console.log('component did mount', name);

    Actions.setItemName(name);
  },

  render: function() {
    var createTeamItem = function(data) {
      return (
        <div className="grid-item">
          <img src={data.img} />
        </div>
      );
    };

    return (
      <div className="details-view">
        <div className="row">
          <div className="col-md-7">
            <img src={this.state.project.img} />
          </div>
          <div className="col-md-5">
            <h3>{this.state.project.title}</h3>
            <p>{this.state.project.desc}</p>
          </div>
        </div>
        <div className="row" >

          <div className="col-md-7">
            <h4>Links</h4>
            <ul className="links">
              {this.state.project.links.map(function(link) {
                return (<li><a href={link}>{link}</a></li>);
              })}
            </ul>
          </div>
          <div className="col-md-5">
            <h4>Team</h4>
            <div ref="masonryContainer" className="grid team-grid">
              {this.state.team.map(createTeamItem)}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = DetailsHandler;
