
/**
 * Module dependecies
 */

var React = require('react');
var Reflux = require('reflux');
var ProjectStore = require('../stores/project-store');
var ProjectsStore = require('../stores/projects-store');
var Actions = require('../actions');
var Nav = require('../components/nav.jsx');

/**
 * Twitter Widget
 */

var TwitterWidget = React.createClass({

  loadTwitter: function() {
    window.twttr && 
      window.twttr.widgets.load();
  },

  componentDidMount: function() {
    this.loadTwitter();
  },

  render: function() {
    var url = "https://twitter.com/" + this.props.widgetUrl;
    var text = "Tweets by @" + this.props.username;

    return (
      <a 
        className="twitter-timeline" 
        data-dnt="true" 
        href={url}
        data-widget-id={this.props.widgetId}
        data-chrome="nofooter noborders noheader noscrollbar">
        {text}
      </a>
    );
  }

});

/**
 * Details View
 */

var DetailsView = React.createClass({

  mixins: [
    Reflux.connect(ProjectStore),
    Reflux.connect(ProjectsStore)
  ],

  getInitialState: function() {
    var name = this.props.params.name;

    return {
      projects: ProjectsStore.getProjects('product'),
      project: ProjectStore.getProject(name),
      items: [
        { 
          name: 'product_details', 
          params: { name: 'ingame' }, 
          title: 'Ingame' 
        },
        { 
          name: 'product_details', 
          params: { name: 'alantu' }, 
          title: 'Alantu' 
        },
        { 
          name: 'product_details', 
          params: { name: 'dift' }, 
          title: 'DiftStats' 
        }
      ]
    };
  },

  componentDidMount: function() {
    console.log('DetailsView.componentDidMount');
  },

  componentWillMount: function() {
    console.log('DetailsView.componentWillMount');
    var name = this.props.params.name;
    Actions.setProjectName(name);
  },

  render: function() {
    //var project = this.state.project;
    // HACK : ver como cambiar el state con la ruta!!
    var project = ProjectStore.getProject(this.props.params.name);
    var className = "details-view " + project.name;

    return (
      <div className={className}>

        <nav className="navbar">
          <div className="container">
            <Nav 
              id="sub-nav" 
              extraClasses="navbar-nav"
              items={this.state.items} />
          </div>
        </nav>

        <div className="row info">
          <div className="col-sm-5">
            <h3>{project.title}</h3>
          </div>
        </div>

        <div className="row info">
          <div className="col-sm-6">
            <p>{project.desc.short}</p>
            <p>{project.desc.long}</p>
          </div>
          <div className="col-sm-6">
            <div className="wrapper">
              <img src={project.img.high} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <h4>Product Info</h4>
            <ul className="links">
              {project.links.map(function(link) {
                return (<li><a href={link}>{link}</a></li>);
              })}
            </ul>

          </div>
          <div className="tweets col-sm-6">
            <h4>Tweets</h4>
            <TwitterWidget 
              {...project.twitter} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = DetailsView;

