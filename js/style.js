////////////////////////////////////////////////////////////////////////////////////////////////////
/// \file           style.js
/// \author         Christof Brungraeber, precog - Visionary Software, http://www.precog.de
/// \date           03.05.2015
////////////////////////////////////////////////////////////////////////////////////////////////////
var BACKGROUNDS_URL = 'data/style/backgrounds.json',
PALETTE_URL = 'data/style/palette.json',
ALPHA_A = 0.1,
ALPHA_B = 0.65,

updateBackgrounds = function(backgrounds, palette) {

  var occupied = {};

  _.each(backgrounds,
        function(description, section) {

          var img,
          colorA,
          colorB;

          do {
            var img = description.images[Math.random() * description.images.length | 0];
          } while(occupied[img]);

          occupied[img] = true;

          colorA = (palette[Math.random() * palette.length | 0]
                    .concat(ALPHA_A)
                    .join(', '));
          colorB = (palette[Math.random() * palette.length | 0]
                    .concat(ALPHA_B)
                    .join(', '));

          if(description.tint)
            $(section).css('background-image',
                           [ 'linear-gradient(',
                             'rgba(',
                             colorA,
                             '),',
                             'rgba(',
                             colorB,
                             ')),',
                             'url(',
                             img,
                             ')'
                           ].join(''));
          else
            $(section).css('background-image',
                           [ 'url(',
                             img,
                             ')'
                           ].join(''));
        });
};

(function() {

   var backgrounds,
   palette;

   $.when(
     $.ajax({ url: BACKGROUNDS_URL,
              dataType: 'json',
              success: function(data) {
                backgrounds = data;
              }
            }),
     $.ajax({ url: PALETTE_URL,
              dataType: 'json',
              success: function(data) {
                palette = data.palette;
              }
            })
   ).then(function() {
            updateBackgrounds(backgrounds,
                              palette);
          });
 })();