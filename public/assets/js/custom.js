(function($){

  "use strict";

  /* ---------------------------------------------- /*
   * Preloader
  /* ---------------------------------------------- */

  $(window).load(function() {
    $('.loader').fadeOut();
    $('.page-loader').delay(850).fadeOut('fast');
  });

  $(document).ready(function() {

    /* ---------------------------------------------- /*
     * Initialization general scripts for all pages
    /* ---------------------------------------------- */

    var moduleHero  = $('#hero'),
      slider      = $('#slides'),
      navbar      = $('.navbar-custom'),
      filters     = $('#filters'),
      worksgrid   = $('#works-grid'),
      modules     = $('.module-hero, .module, .module-small'),
      windowWidth = Math.max($(window).width(), window.innerWidth),
      navbatTrans,
      mobileTest;

    /* ---------------------------------------------- /*
     * Mobile detect
    /* ---------------------------------------------- */

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      mobileTest = true;
    } else {
      mobileTest = false;
    }

    navbarCheck(navbar);


    $(window).scroll(function() {
      navbarAnimation(navbar, moduleHero);
    }).scroll();

    /* ---------------------------------------------- /*
     * Intro slider setup
    /* ---------------------------------------------- */

    $('#slides').superslides({
      play: 10000,
      animation: 'fade',
      animation_speed: 800,
      pagination: true,
    });

    /* ---------------------------------------------- /*
     * Setting background of modules
    /* ---------------------------------------------- */

    modules.each(function() {
      if ($(this).attr('data-background')) {
        $(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
      }
    });

    /* ---------------------------------------------- /*
     * Check first module overlay/ Slider overlay
    /* ---------------------------------------------- */

    if (navbar.next().hasClass('bg-dark') || navbar.next().hasClass('bg-dark-30') || navbar.next().hasClass('bg-dark-60') || navbar.next().hasClass('bg-dark-30')) {
      navbar.addClass('navbar-dark');
    } else {
      navbar.removeClass('navbar-dark');
    }

    var currentslide = $('#slides').superslides('current');

    var slidesContainer = [];
    $('.slides-container li').each(function () {
      slidesContainer.push($(this));
    });

    if (currentslide === 0) {
      if (slidesContainer[currentslide].hasClass('bg-dark') || slidesContainer[currentslide].hasClass('bg-dark-30') || slidesContainer[currentslide].hasClass('bg-dark-60') || slidesContainer[currentslide].hasClass('bg-dark-90')) {
        navbar.addClass('navbar-dark');
      } else {
        navbar.removeClass('navbar-dark');
      }
    }

    $(document).on('animated.slides', function() {
      currentslide = $('#slides').superslides('current');
      if (slidesContainer[currentslide].hasClass('bg-dark') || slidesContainer[currentslide].hasClass('bg-dark-30') || slidesContainer[currentslide].hasClass('bg-dark-60') || slidesContainer[currentslide].hasClass('bg-dark-90')) {
        navbar.addClass('navbar-dark');
      } else {
        navbar.removeClass('navbar-dark');
      }
    });

    /* ---------------------------------------------- /*
     * Parallax
    /* ---------------------------------------------- */

    if (mobileTest === true) {
      $('.module-parallax').css({'background-attachment': 'scroll'});
    } else {
      $('#hero.module-parallax').parallax('50%', 0.2);
    }

    /* ---------------------------------------------- /*
     * Full height module
    /* ---------------------------------------------- */


    /* ---------------------------------------------- /*
     * Youtube video background
    /* ---------------------------------------------- */

    $(function(){
      $('.video-player').mb_YTPlayer({
        playOnlyIfVisible  : false,
        optimizeDisplay: true,
      });
    });

    /* ---------------------------------------------- /*
     * Transparent navbar animation
    /* ---------------------------------------------- */

    function navbarCheck() {
      if (navbar.length > 0 && navbar.hasClass('navbar-transparent')) {
        navbatTrans = true;
      } else {
        navbatTrans = false;
      }
    }

    function navbarAnimation(navbar, moduleHero) {
      var topScroll = $(window).scrollTop();
      if (navbar.length > 0 && navbatTrans !== false) {
        if (topScroll >= 5) {
          navbar.removeClass('navbar-transparent');
        } else {
          navbar.addClass('navbar-transparent');
        }
      }
    }

    /* ---------------------------------------------- /*
     * Navbar submenu
    /* ---------------------------------------------- */

    $(window).on('resize', function() {

      var width = Math.max($(window).width(), window.innerWidth);

      if (width > 767) {
        $('.navbar-custom .navbar-nav > li.dropdown').hover(function() {
          var menuLeftOffset  = $('.dropdown-menu', $(this)).offset().left;
          var
            maxWidth1    = 0,
            maxWidth2    = 0,
            menuLevelOne = $(this).children('.dropdown-menu'),
            menuLevelTwo = $('.dropdown-menu', menuLevelOne),
            menuLevelOneWidth,
            menuLevelTwoWidth;

          menuLevelOne.each(function() {
            if ($(this).width() > maxWidth1) {
              menuLevelOneWidth = $(this).width();
            }
          });

          menuLevelTwo.each(function() {
            if ($(this).width() > maxWidth2) {
              menuLevelTwoWidth = $(this).width();
            }
          });

          if (typeof menuLevelTwoWidth === 'undefined') {
            menuLevelTwoWidth = 0;
          }

          if (width - menuLeftOffset - menuLevelOneWidth < menuLevelOneWidth + 20) {
            $(this).children('.dropdown-menu').addClass('leftauto');

            if (menuLevelTwo.length > 0) {
              if (width - menuLeftOffset - menuLevelOneWidth < menuLevelTwoWidth + 20) {
                menuLevelTwo.addClass('left-side');
              } else {
                menuLevelTwo.removeClass('left-side');
              }
            }
          } else {
            $(this).children('.dropdown-menu').removeClass('leftauto');
          }
        });
      }
    }).resize();

    /* ---------------------------------------------- /*
     * Navbar hover dropdown on desktop
    /* ---------------------------------------------- */

    function hoverDropdown(width, mobileTest) {
      if ((width > 767) && (mobileTest !== true)) {
        $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').removeClass('open');
        var delay = 0;
        var setTimeoutConst;
        $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').hover(function() {
          var $this = $(this);
          setTimeoutConst = setTimeout(function() {
            $this.addClass('open');
            $this.find('.dropdown-toggle').addClass('disabled');
          }, delay);
        },
        function() {
          clearTimeout(setTimeoutConst);
          $(this).removeClass('open');
          $(this).find('.dropdown-toggle').removeClass('disabled');
        });
      } else {
        $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').unbind('mouseenter mouseleave');
        $('.navbar-custom [data-toggle=dropdown]').not('.binded').addClass('binded').on('click', function(event) {
          event.preventDefault();
          event.stopPropagation();
          $(this).parent().siblings().removeClass('open');
          $(this).parent().siblings().find('[data-toggle=dropdown]').parent().removeClass('open');
          $(this).parent().toggleClass('open');
        });
      }
    }

    // #<{(| ---------------------------------------------- #<{(|
    //  * Portfolio
    // #<{(| ---------------------------------------------- |)}>#
    //
    // var worksgrid_mode;
    // if (worksgrid.hasClass('works-grid-masonry')) {
    //   worksgrid_mode = 'masonry';
    // } else {
    //   worksgrid_mode = 'packery';
    // }
    //
    // $('a', filters).on('click', function() {
    //   var selector = $(this).attr('data-filter');
    //
    //   $('.current', filters).removeClass('current');
    //   $(this).addClass('current');
    //
    //   worksgrid.isotope({
    //     filter: selector
    //   });
    //
    //   return false;
    // });
    //
    // $(window).on('resize', function() {
    //
    //   var windowWidth    = Math.max($(window).width(), window.innerWidth),
    //     itemWidht      = $('.grid-sizer').width(),
    //     itemHeight     = Math.floor(itemWidht * 0.95),
    //     itemTallHeight = itemHeight * 2;
    //
    //   if (windowWidth > 500) {
    //     $('.work-item', worksgrid).each(function() {
    //       if ($(this).hasClass('tall')) {
    //         $(this).css({
    //           height : itemTallHeight
    //         });
    //       } else if ($(this).hasClass('wide')) {
    //         $(this).css({
    //           height : itemHeight
    //         });
    //       } else if ($(this).hasClass('wide-tall')) {
    //         $(this).css({
    //           height : itemTallHeight
    //         });
    //       } else {
    //         $(this).css({
    //           height : itemHeight
    //         });
    //       }
    //     });
    //   } else {
    //     $('.work-item', worksgrid).each(function() {
    //       if ($(this).hasClass('tall')) {
    //         $(this).css({
    //           height : itemTallHeight
    //         });
    //       } else if ($(this).hasClass('wide')) {
    //         $(this).css({
    //           height : itemHeight / 2
    //         });
    //       } else if ($(this).hasClass('wide-tall')) {
    //         $(this).css({
    //           height : itemHeight
    //         });
    //       } else {
    //         $(this).css({
    //           height : itemHeight
    //         });
    //       }
    //     });
    //   }
    //
    //   worksgrid.imagesLoaded(function() {
    //     worksgrid.isotope({
    //       layoutMode: worksgrid_mode,
    //       itemSelector: '.work-item',
    //       transitionDuration: '0.3s',
    //       packery: {
    //         columnWidth: '.grid-sizer',
    //       },
    //     });
    //   });
    //
    // }).resize();
    //
    // #<{(| ---------------------------------------------- #<{(|
    //  * Blog grid
    // #<{(| ---------------------------------------------- |)}>#
    //
    // $('#posts-masonry').imagesLoaded(function() {
    //   $('#posts-masonry').isotope({
    //     layoutMode: 'masonry',
    //     transitionDuration: '0.3s'
    //   });
    // });
    //
    // #<{(| ---------------------------------------------- #<{(|
    //  * Ajax options
    // #<{(| ---------------------------------------------- |)}>#
    //
    // var pageNumber = 0,
    //   workNumberToload = 5;
    //
    // var doneText    = 'Done',
    //   loadText    = 'More works',
    //   loadingText = 'Loading...',
    //   errorText   = 'Error! Check the console for more information.';
    /* ---------------------------------------------- /*
     * Progress bars, counters animations
    /* ---------------------------------------------- */

    $('.progress-bar').each(function(i) {
      $(this).appear(function() {
        var percent = $(this).attr('aria-valuenow');
        $(this).animate({'width' : percent + '%'});
        $(this).find('span').animate({'opacity' : 1}, 900);
        $(this).find('span').countTo({from: 0, to: percent, speed: 900, refreshInterval: 30});
      });
    });

    $('.counter-item').each(function(i) {
      $(this).appear(function() {
        var number = $(this).find('.counter-number').data('number');
        $(this).find('.counter-number span').countTo({from: 0, to: number, speed: 1200, refreshInterval: 30});
      });
    });

    /* ---------------------------------------------- /*
     * WOW Animation
    /* ---------------------------------------------- */

    var wow = new WOW({
      mobile: false
    });

    wow.init();

    /* ---------------------------------------------- /*
     * A jQuery plugin for fluid width video embeds
    /* ---------------------------------------------- */

    $('body').fitVids();

    /* ---------------------------------------------- /*
     * Scroll Animation
    /* ---------------------------------------------- */

    $('.section-scroll').bind('click', function(e) {
      var anchor = $(this);

      $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top
      }, 1000);

      e.preventDefault();
    });

    /* ---------------------------------------------- /*
     * Scroll top
    /* ---------------------------------------------- */

    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('.scroll-up').fadeIn();
      } else {
        $('.scroll-up').fadeOut();
      }
    });

    $('a[href="#totop"]').click(function() {
      $('html, body').animate({ scrollTop: 0 }, 'slow');
      return false;
    });

  });

})(jQuery);
