$(document).ready(function () {


    // Sidebar ----------------------------------
    const sidebar = $('#sidebar');
    const sidebarToggle = $('#sidebarToggle');

    sidebarToggle.on('click', function () {
        if (window.innerWidth <= 992) {
            sidebar.toggleClass('expanded');
        } else {
            sidebar.toggleClass('collapsed');
        }
        // Toggle icon animation
        $(this).toggleClass('active');
    });
    // Sidebar ----------------------------------










});