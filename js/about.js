////////////////////////////////////////////////////////////////////////////////////////////////////
/// \file           about.js
/// \author         Christof Brungraeber, precog - Visionary Software, http://www.precog.de
/// \date           03.05.2015
////////////////////////////////////////////////////////////////////////////////////////////////////
var ABOUT_URL = 'data/about/about.json',

AboutImage =
  React.createClass(
    { render: function() {

        var style = (this.props.index == 5
                     ? { position: 'absolute',
                         bottom: 0
                       }
                     : {});

        return(
            <div className='timeline-image' style={ style }>
            <a href={ this.props.about.image } title={ this.props.about.title }>
            <img className='img-circle img-responsive' src={ this.props.about.thumbnail } />
            </a>
            </div>
        );
      }
    }),

AboutPanel =
  React.createClass(
    { render: function() {
        return(
            <div className='timeline-panel'>
            <div className='timeline-panel-body'>
            <div className='timeline-heading'>
            <h4>{ this.props.about.title }</h4>
            </div>

            <div className='timeline-body'>
            <p className='text-muted'>{ this.props.about.description }</p>
            </div>
            </div>
            </div>
        );
      }
    }
  ),

AboutItem =
  React.createClass(
    { render: function() {

        var orientation = (this.props.index % 2
                           ? 'timeline-inverted'
                           : '');

        return(
            <li className={ orientation }>
            <AboutImage about={ this.props.about } index={ this.props.index } />
            <AboutPanel about={ this.props.about } />
            </li>
        );
      }

    }),

AboutTimeline =
  React.createClass(
    { render: function() {
        var aboutItems = _.map(this.props.about,
                               function(about, index) {
                                 return(
                                     <AboutItem about={about} index={index} key={index} />
                                 );
                               });

        return(
            <ul className='timeline'>
            { aboutItems }
          </ul>
        );
      }
    }),

AboutContainer =
  React.createClass(
    { loadAbout: function() {

        $.ajax({ url: ABOUT_URL,
                 dataType: 'json',
                 success: _.bind(function(data) {
                                   this.setState({ about: rearrange(data.about)
                                                 });
                                 },
                                 this),
                 error: _.bind(function(xhr, status, err) {
                                 console.error(URL,
                                               status,
                                               err.toString());
                               },
                               this)
               });
      },

      getInitialState: function() {
        return({ about: []
               });
      },

      componentDidMount: function() {
        this.loadAbout();
      },

      render: function() {

        return(
            <AboutTimeline about={this.state.about} />
        );
      }
    }
  );

React.render(<AboutContainer />,
             document.getElementById('about-container'));