
/**
 * Module dependecies
 */

var Reflux = require('reflux');
var ProjectStore = require('../stores/project-store');
var ProjectsStore = require('../stores/projects-store');
var Actions = require('../actions');
var Nav = require('../components/nav.jsx');

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
      project: ProjectStore.getProject(name)
    };
  },

  componentDidMount: function() {
  
  },

  componentWillMount: function() {
    var name = this.props.params.name;
    Actions.setProjectName(name);
  },

  renderTwitter: function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};

    if (d.getElementById(id)) return t;

    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };

    return t;
  },

  render: function() {
    var project = this.state.project;
    var className = "details-view " + project.name;

    console.log(this.state, this.props);

    return (
      <div className={className}>

        <Nav elementId="products-nav" items={[
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
        ]} />

        <div className="row info">
          <div className="col-sm-5">
            <h3>{project.title}</h3>
          </div>
        </div>

        <div className="row info">
          <div className="col-sm-5">
            <p>{project.desc.short}</p>
            <p>{project.desc.long}</p>
          </div>
          <div className="col-sm-7">
            <div className="wrapper">
              <img 
                src={project.img.details || project.img.low} 
                data-src={project.img.details || project.img.high} 
                className="lazyload" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-5">
            <h4>Product Info</h4>
            <ul className="links">
              {project.links.map(function(link) {
                return (<li><a href={link}>{link}</a></li>);
              })}
            </ul>

          </div>
          <div className="col-sm-7">
            <h4>Tweets</h4>
            <a 
              className="twitter-timeline" 
              data-dnt="true" 
              href="https://twitter.com/alantu" 
              data-widget-id="626451037973573632"
              data-chrome="nofooter noborders noheader noscrollbar"> 
              Tweets by @alantu
            </a>

            { this.renderTwitter(document, "script", "twitter-wjs") }
          </div>
        </div>
      </div>
    );
  }
});

module.exports = DetailsView;
