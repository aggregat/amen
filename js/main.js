////////////////////////////////////////////////////////////////////////////////////////////////////
/// \file           main.js
/// \author         Christof Brungraeber, precog - Visionary Software, http://www.precog.de
/// \date           25.04.2015
////////////////////////////////////////////////////////////////////////////////////////////////////
/*
$(window)
  .scroll(function() {
            if ($(".navbar").offset().top > 50) {
              $(".navbar-fixed-top").addClass("top-nav-collapse");
            }
            else {
              $(".navbar-fixed-top").removeClass("top-nav-collapse");
            }
          });
*/
$.ajaxSetup ({ cache: false });

$(function() {
    $('a.page-scroll')
      .bind('click',
            function(event) {
              var $anchor = $(this);
              $('html, body').stop().animate({ scrollTop: $($anchor.attr('href')).offset().top
                                             },
                                             1500,
                                             'easeInOutExpo');
              event.preventDefault();
            });
  });

$('.navbar-collapse ul li a')
  .click(function() {
           $('.navbar-toggle:visible').click();
         });

$(document).ready(
  function() {
    $('.image-link').magnificPopup({type:'image'});
  });

$('.about-gallery')
  .magnificPopup(
    { delegate: 'a',
      type: 'image',
      image: {
        verticalFit: true
      }
    });

$('.events-gallery')
  .magnificPopup(
    { delegate: 'a.ajax',
      type: 'ajax',
      image: {
        verticalFit: true
      }
    });

$('.imprint-gallery')
  .magnificPopup(
    { delegate: 'a',
      type: 'ajax',
      image: {
        verticalFit: true
      }
    });

$('.disclaimer-gallery')
  .magnificPopup(
    { delegate: 'a',
      type: 'ajax',
      image: {
        verticalFit: true
      }
    });