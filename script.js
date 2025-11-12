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


    // Category Item Click Functionality -----------------------
    $('.category-item').on('click', function () {
        // Remove 'active' class from all category items
        $('.category-item').removeClass('active');
        
        // Add 'active' to the clicked one
        $(this).addClass('active');
    });


});