/**
* Template Name: NiceAdmin
* Updated: Mar 09 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Sidebar toggle
   */
  if (select('.toggle-sidebar-btn-desk')) {

    on('click', '.toggle-sidebar-btn-desk', function(e) {
      select('body').classList.toggle('toggle-sidebar')
    })

  }
      $( ".toggle-sidebar-btn-mob" ).on( "click", function() {
      $( ".toggle-sidebar-btn-desk" ).trigger( "click" );
    } );



  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }



  /**
   * Initiate tooltips
   */
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })


function toggleTheme() {
        const body = $('body');
        if (body.hasClass('hwe__dark-theme')) {
            body.removeClass('hwe__dark-theme').addClass('hwe__light-theme');
            setTimeout(function() { $("body").css("opacity", 1); }, 500);
            localStorage.setItem('theme', 'light');

        } else {
            body.removeClass('hwe__light-theme').addClass('hwe__dark-theme');
            setTimeout(function() { $("body").css("opacity", 1); }, 500);
            localStorage.setItem('theme', 'dark');
        }
    }

    // Check user's preference from local storage (if set)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        $('body').addClass('hwe__dark-theme');
        $('#hwe__color-input').prop('checked', true);
        setTimeout(function() {
        $("body").css("opacity", "1"); // Change the display property to "block" or remove this line to show the body content.
    }, 500); // 3000 milliseconds (3 seconds) delay

    } else if (savedTheme === 'light') {
        $('body').addClass('hwe__light-theme');
        $('#hwe__color-input').prop('checked', false);
        setTimeout(function() {
        $("body").css("opacity", "1"); // Change the display property to "block" or remove this line to show the body content.
    }, 500); // 3000 milliseconds (3 seconds) delay

    } else {
        // If no preference is set, use the browser's default theme
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkScheme) {
            $('body').addClass('hwe__dark-theme');
            setTimeout(function() { $("body").css("opacity", 1); }, 500);
            $('#hwe__color-input').prop('checked', true);

        } else {
            $('body').addClass('hwe__light-theme');
            setTimeout(function() { $("body").css("opacity", 1); }, 500);
            $('#hwe__color-input').prop('checked', false);
        }
    }

    // Add click event listener to toggle button
    $('#hwe__color-input').on('click', toggleTheme);

$( ".hwe__theme-mode" ).on( "click", function() {
  $( "#hwe__color-input" ).trigger( "click" );
} );


})();
