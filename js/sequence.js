////////////////////////////////////////////////////////////////////////////////////////////////////
/// \file           sequence.js
/// \author         Christof Brungraeber, precog - Visionary Software, http://www.precog.de
/// \date           05.05.2015
////////////////////////////////////////////////////////////////////////////////////////////////////
var SEQUENCE = _.shuffle([0, 1, 2]),

rearrange = function(a) {

  var m;
  return(_.isArray(a)
         && a.length >= SEQUENCE.length
         && (m = a.length / SEQUENCE.length | 0)
         ? _.map(a,
                 function(x, i) {
                   return(a[SEQUENCE[i / m | 0] * m + (i % m) | 0]);
                 })
         : a);
},

SHUFFLED_TITLE_PREFIX = 'Kirchgemeinden ',
SHUFFLED_TITLE_INFIXES = [ 'Kaltenwestheim',
                           'Mittelsdorf',
                           'Reichenhausen'
                         ],
SHUFFLED_TITLE_SEPARATOR = ', ',
SHUFFLED_TITLE_SUFFIX = '',

SHUFFLED_TITLE = (SHUFFLED_TITLE_PREFIX
                  + rearrange(SHUFFLED_TITLE_INFIXES).join(SHUFFLED_TITLE_SEPARATOR)
                  + SHUFFLED_TITLE_SUFFIX);

$('.shuffled-title').text(SHUFFLED_TITLE);
