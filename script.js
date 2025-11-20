$(document).ready(function () {
  // Sidebar, Overlay, and Flyout elements
  const $sidebar = $('#sidebar');
  const $sidebarToggle = $('#sidebarToggle');
  const $sidebarOverlay = $('#sidebarOverlay');
  const $flyout = $('.sidebar-flyout');
  let flyoutTimer;
 
  // Function to close the sidebar
  function closeSidebar() {
    $sidebar.removeClass('expanded');
    $sidebarToggle.removeClass('active');
    $sidebarOverlay.removeClass('active');
  }

  // Toggle sidebar on click
  $sidebarToggle.on('click', function () {
    $sidebar.toggleClass('expanded');
    $(this).toggleClass('active');
    $sidebarOverlay.toggleClass('active');
  });

  // Close sidebar when overlay is clicked
  $sidebarOverlay.on('click', closeSidebar);

  // Flyout Menu Logic (for collapsed desktop sidebar)
  $('.sidebar .nav-item').on('mouseenter', function () {
    // Only show flyout if the sidebar is collapsed and not on a mobile screen
    if ($sidebar.hasClass('expanded') || window.innerWidth <= 768) {
      return;
    }

    const $this = $(this);
    const $submenu = $this.find('.sidebar-submenu');
    const title = $this.find('a > span').text(); // Correctly find span inside the link
    
    // Only proceed if there is a title or a submenu
    if (!title) {
      return;
    }

    clearTimeout(flyoutTimer);
    $flyout.html(''); // Clear previous content
    $flyout.append(`<div class="flyout-header">${title}</div>`);
    
    if ($submenu.length) {
      // Clone the submenu and make it visible inside the flyout
      $flyout.append($submenu.clone().show());
    }

    $flyout.css({
      top: $this.find('a').offset().top, // Use the link's offset for correct positioning
      left: $sidebar.outerWidth(),
      display: 'block'
    });
  });

  $('.sidebar .nav-item').on('mouseleave', function () {
    if ($sidebar.hasClass('expanded')) {
      return;
    }
    flyoutTimer = setTimeout(() => $flyout.hide(), 100);
  });

  $flyout.on('mouseenter', function () {
    if ($sidebar.hasClass('expanded')) {
      return;
    }
    clearTimeout(flyoutTimer);
  });

  $flyout.on('mouseleave', function () {
    if ($sidebar.hasClass('expanded')) {
      return;
    }
    $flyout.hide();
  });

  // Category Item Click Functionality
  $('.category-item').on('click', function () {
    // Remove 'active' class from all category items
    $('.category-item').removeClass('active');
    
    // Add 'active' to the clicked one
    $(this).addClass('active');
  });
  
  // Fullscreen toggle functionality
  const fullscreenToggle = document.getElementById('fullscreenToggle');
  if (fullscreenToggle) {
    fullscreenToggle.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });
  }
});