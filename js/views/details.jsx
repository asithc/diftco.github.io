
/**
 * Module dependecies
 */

var Reflux = require('reflux');
var ProjectStore = require('../stores/project-store');
var TeamStore = require('../stores/team-store');
var Actions = require('../actions');

/**
 * Details View
 */

var DetailsView = React.createClass({

  mixins: [
    Reflux.connect(ProjectStore),
    Reflux.connect(TeamStore)
  ],

  getInitialState: function() {
    var name = this.props.params.name;


    return {
      project: ProjectStore.getProject(name),
      media: [
        { img: "http://placehold.it/70x70", title: "Manifesto" },
        { img: "http://placehold.it/70x70", title: "Product" },
        { img: "http://placehold.it/70x70", title: "Demo" }
      ]
    };
  },

  componentDidMount: function() {
    var name = this.props.params.name;

    console.log('Details.componentDidMount', name);

    Actions.setProjectName(name);
  },

  render: function() {
    var createMediaItem = function(d) {
      return (
        <li className="media-item">
          <a className="hint--bottom" data-hint={d.title}>
            <img src={d.img} />
          </a>
        </li>
      );
    };

    var project = this.state.project;

    var className = "details-view " + project.name;

    return (
      <div className={className}>
        <div className="row">
          <div className="col-sm-7">
            <div className="wrapper">
              <img 
                src={project.img.details || project.img.low} 
                data-src={project.img.details || project.img.high} 
                className="lazyload" />
            </div>
          </div>
          <div className="col-sm-5">
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
          </div>
        </div>
        <div className="row" >

          <div className="col-sm-7">
            <h4>Links</h4>
            <ul className="links">
              {project.links.map(function(link) {
                return (<li><a href={link}>{link}</a></li>);
              })}
            </ul>
          </div>
          <div className="col-sm-5">
            <h4>Media</h4>
            <ul className="media-list">
              {this.state.media.map(createMediaItem)}
            </ul>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = DetailsView;
