$(document).ready(function () {
  // Sidebar ------------------------------
  const $sidebar = $('#sidebar');
  const $toggleSidebar = $('#sidebarToggle');
  const $flyout = $('.sidebar-flyout');
  let flyoutTimer;

  $toggleSidebar.on('click', function () {
    $sidebar.toggleClass('expanded');
    $(this).toggleClass('active');
    // Hide any open flyout when toggling
    $flyout.hide();
  });

  // Flyout Menu Logic --------------------
  
  // Mouse enter on a nav item
  $('.sidebar .nav-item').on('mouseenter', function () {
    // 1. Get elements and data
    const $this = $(this);
    const $link = $this.find('> a');
    const $submenu = $this.find('.sidebar-submenu');
    const title = $link.find('span').text();
    const topPosition = $this.offset().top;

    // 2. Clear any pending hide timer
    clearTimeout(flyoutTimer);
    
    // 3. Build the flyout content
    $flyout.html(''); // Clear previous content
    
    // Always add the main link text as a header
    $flyout.append(`<div class="flyout-header">${title}</div>`);
    
    // If there is a submenu, clone and append it
    if ($submenu.length > 0) {
      const $clonedSubmenu = $submenu.clone().show();
      $clonedSubmenu.find('a').css('color', '#fff'); // Style links for dark flyout
      $flyout.append($clonedSubmenu);
    }
    
    // 4. Position and show the flyout (only if collapsed)
    if (!$sidebar.hasClass('expanded')) {
      $flyout.css({
        top: topPosition,
        left: $sidebar.width(), // Position next to collapsed sidebar
        display: 'block'
      });
    }
  });

  // Mouse leave from a nav item
  $('.sidebar .nav-item').on('mouseleave', function () {
    // Set a timer to hide the flyout, allowing mouse to move into it
    flyoutTimer = setTimeout(() => {
      $flyout.hide();
    }, 100);
  });

  // Keep flyout open if mouse moves into it
  $flyout.on('mouseenter', function () {
    if ($sidebar.hasClass('expanded')) {
      $flyout.hide(); // Hide if expanded
      return;
    }
    clearTimeout(flyoutTimer); // Cancel the hide timer
  });

  // Hide flyout when mouse leaves it
  $flyout.on('mouseleave', function () {
    if ($sidebar.hasClass('expanded')) {
      return; // Do nothing if expanded
    }
    flyoutTimer = setTimeout(() => {
      $flyout.hide();
    }, 100);
  });
  
  // Sidebar ------------------------------

  // Fullscreen toggle functionality -------
  const fullscreenToggle = document.getElementById('fullscreenToggle');

  fullscreenToggle.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        fullscreenToggle.className = 'fa-solid fa-compress'; // Font Awesome icon
        fullscreenToggle.title = 'Exit Fullscreen';
      }).catch(err => {
        console.error('Error entering fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        fullscreenToggle.className = 'fa-solid fa-expand'; // Font Awesome icon
        fullscreenToggle.title = 'Fullscreen';
      }).catch(err => {
        console.error('Error exiting fullscreen:', err);
      });
    }
  });
  
  // Fix fullscreen icon class in script.js
  if (document.fullscreenElement) {
    fullscreenToggle.className = 'fa-solid fa-compress';
    fullscreenToggle.title = 'Exit Fullscreen';
  } else {
    fullscreenToggle.className = 'fa-solid fa-expand';
    fullscreenToggle.title = 'Fullscreen';
  }
});