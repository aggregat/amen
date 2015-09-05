////////////////////////////////////////////////////////////////////////////////////////////////////
/// \file           events.js
/// \author         Christof Brungraeber, precog - Visionary Software, http://www.precog.de
/// \date           25.04.2015
////////////////////////////////////////////////////////////////////////////////////////////////////
var EVENTS_URL = 'data/events/events.json',

EventImageOuter =
  React.createClass(
    { render: function() {

        return(this.props.event.contents
               ? (<a href={ this.props.event.contents }>
                  { this.props.children }
                  </a>
                 )
               : this.props.children);
      }
    }),

EventImageInner =
  React.createClass(
    { render: function() {

        var DATE_REGEX = /([0-9]+\.[0-9]+\.)([0-9]+)/,
        dateMatch = this.props.event.date.match(DATE_REGEX),
        dateTokens = (dateMatch
                      ? dateMatch.slice(1)
                      : this.props.event.date.split('.')),
        dateItems = _.map(dateTokens,
                          function(token) {
                            return(<p>{ token }</p>);
                          });

        return(this.props.event.date.length
               ? <h1>{ dateItems }</h1>
               : <img className='img-circle img-responsive' src={ this.props.event.image } />
              );
      }
    }
  ),

EventImage =
  React.createClass(
    { render: function() {

        var color = 'rgba(255, 255, 255, 0.6)',
        style = (this.props.event.image
                     ? { backgroundImage: [
                           'linear-gradient(',
                           color,
                           ',',
                           color,
                           '),',
                           'url(',
                           this.props.event.image,
                           ')'
                         ].join(''),
                         backgroundSize: '100% 100%'
                       }
                     : {});

        return(
            <div className='timeline-image' style={ style }>
            <div className='timeline-image-body'>
            <EventImageOuter event={ this.props.event }>
            <EventImageInner event={ this.props.event } />
            </EventImageOuter>
            </div>
            </div>
        );
      }
    }),

EventPanel =
  React.createClass(
    { render: function() {
        return(
            <div className='timeline-panel'>
            <div className='timeline-panel-body'>
            <div className='timeline-heading'>
            <h4>{ this.props.event.title }</h4>
            </div>

            <div className='timeline-body'>
            <p className='text-muted'>{ this.props.event.description }</p>
            </div>
            </div>
            </div>
        );
      }
    }
  ),

EventItem =
  React.createClass(
    { render: function() {

        var orientation = (this.props.index % 2
                           ? 'timeline-inverted'
                           : '');

        return(
            <li className={ orientation }>
            <EventImage event={ this.props.event } />
            <EventPanel event={ this.props.event } />
            </li>
        );
      }

    }),

EventsTimeline =
  React.createClass(
    { render: function() {
        var eventItems = _.map(this.props.events,
                               function(event, index) {
                                 return(
                                     <EventItem event={event} index={index} key={index} />
                                 );
                               });

        return(
            <ul className='timeline'>
            { eventItems }
          </ul>
        );
      }
    }),

EventsContainer =
  React.createClass(
    { loadEvents: function() {

        $.ajax({ url: EVENTS_URL,
                 dataType: 'json',
                 success: _.bind(function(data) {
                                   this.setState({ events: data.events
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
        return({ events: []
               });
      },

      componentDidMount: function() {
        this.loadEvents();
      },

      render: function() {

        return(
            <EventsTimeline events={this.state.events} />
        );
      }

    });

React.render(<EventsContainer />,
             document.getElementById('events-container'));