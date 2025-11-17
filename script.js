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
    // Only show the overlay on mobile/tablet where the sidebar is an overlay
    if (window.innerWidth <= 768) {
      $sidebarOverlay.toggleClass('active');
    }
  });

  // Close sidebar when overlay is clicked
  $sidebarOverlay.on('click', closeSidebar);

  // Flyout Menu Logic (for collapsed desktop sidebar)
  $('.sidebar .nav-item').on('mouseenter', function () {
    if ($sidebar.hasClass('expanded')) return; // Don't show flyout if expanded
    const $this = $(this);
    const title = $this.find('span').text();
    if (!title) return;

    clearTimeout(flyoutTimer);
    $flyout.html(`<div class="flyout-header">${title}</div>`);
    $flyout.css({
      top: $this.offset().top,
      left: $sidebar.outerWidth(),
      display: 'block'
    });
  });

  $('.sidebar .nav-item').on('mouseleave', function () {
    if ($sidebar.hasClass('expanded')) return;
    flyoutTimer = setTimeout(() => $flyout.hide(), 100);
  });

  $flyout.on('mouseenter', function () {
    if ($sidebar.hasClass('expanded')) return;
    clearTimeout(flyoutTimer);
  });

  $flyout.on('mouseleave', function () {
    if ($sidebar.hasClass('expanded')) return;
    $flyout.hide();
  });

  // Category Item Click Functionality
    // Category Item Click Functionality -----------------------
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