$(document).ready(function () {
  // Sidebar ------------------------------
  const sidebar = $('#sidebar');
  const sidebarToggle = $('#sidebarToggle');
  const sidebarOverlay = $('#sidebarOverlay');

  // Function to close the sidebar
  function closeSidebar() {
    sidebar.removeClass('expanded');
    sidebarToggle.removeClass('active');
    sidebarOverlay.removeClass('active');
  }

  // Toggle sidebar
  sidebarToggle.on('click', function () {
    sidebar.toggleClass('expanded');
    $(this).toggleClass('active');
    sidebarOverlay.toggleClass('active');
  });

  // Close sidebar when overlay is clicked
  sidebarOverlay.on('click', function () {
    closeSidebar();
  });
  // Sidebar ------------------------------

  // Category Item Click Functionality -----------------------
    $('.category-item').on('click', function () {
        // Remove 'active' class from all category items
        $('.category-item').removeClass('active');
        
        // Add 'active' to the clicked one
        $(this).addClass('active');
    });

  // Fullscreen toggle functionality -------
  const fullscreenToggle = document.getElementById('fullscreenToggle');

  fullscreenToggle.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        fullscreenToggle.className = 'bi bi-fullscreen-exit';
        fullscreenToggle.title = 'Exit Fullscreen';
      }).catch(err => {
        console.error('Error entering fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        fullscreenToggle.className = 'bi bi-fullscreen';
        fullscreenToggle.title = 'Fullscreen';
      }).catch(err => {
        console.error('Error exiting fullscreen:', err);
      });
    }
  });
});

  // Quantity controls and billing updates ---------------------------------
  function parsePrice(text) {
    // extract number from strings like '₹120'
    const n = String(text).replace(/[^0-9\.]/g, '');
    return parseFloat(n) || 0;
  }

  function formatCurrency(n) {
    // show as integer rupee with symbol
    return '₹' + Math.round(n).toLocaleString();
  }

  function calculateTotals() {
    let subtotal = 0;
    $('.order-item').each(function () {
      const $it = $(this);
      const price = parsePrice($it.find('.item-price').first().text());
      const qty = parseInt($it.find('.qty-display').first().text(), 10) || 0;
      subtotal += price * qty;
    });

    // tax 10% (same as previous example values)
    const tax = Math.round(subtotal * 0.1);
    const total = Math.round(subtotal + tax);

    const $billing = $('.billing-section');
    // update Subtotal (second span in first row)
    $billing.find('div.d-flex').eq(0).find('span').eq(1).text(formatCurrency(subtotal));
    // update Tax (second row)
    $billing.find('div.d-flex').eq(1).find('span').eq(1).text(formatCurrency(tax));
    // update Total (fw-bold row)
    $billing.find('div.fw-bold').find('span').eq(1).text(formatCurrency(total));
  }

  // handle plus/minus clicks (delegated)
  $(document).on('click', '.qty-btn', function (e) {
    e.preventDefault();
    const $btn = $(this);
    const $item = $btn.closest('.order-item');
    const $display = $item.find('.qty-display').first();
    let qty = parseInt($display.text(), 10) || 0;

    if ($btn.is(':contains("+")') || $btn.find('i').hasClass('bi-plus') ) {
      qty += 1;
    } else if ($btn.is(':contains("-")') || $btn.find('i').hasClass('bi-dash') ) {
      qty = Math.max(1, qty - 1);
    } else {
      // fallback: check aria-label
      const label = ($btn.attr('aria-label') || '').toLowerCase();
      if (label.includes('increase') || label.includes('add')) qty += 1;
      if (label.includes('decrease') || label.includes('minus')) qty = Math.max(1, qty - 1);
    }

    $display.text(qty);
    calculateTotals();
  });

  // handle remove
  $(document).on('click', '.remove-btn', function (e) {
    e.preventDefault();
    const $li = $(this).closest('.order-item');
    $li.fadeOut(180, function () {
      $(this).remove();
      calculateTotals();
    });
  });

  // initialize totals on page load
  calculateTotals();

  // handle Add button on product cards
  $(document).on('click', '.add-btn', function (e) {
    e.preventDefault();
    const $btn = $(this);
    const $card = $btn.closest('.card');
    const name = $card.find('.card-title').text().trim();
    const priceText = $card.find('.small').first().text().trim();
    const imgSrc = $card.find('img').attr('src') || '';

    // if item already exists in order list, increment quantity
    const $existing = $('.order-item').filter(function () {
      return $(this).find('.item-name').text().trim() === name;
    });

    if ($existing.length) {
      const $disp = $existing.first().find('.qty-display');
      let qty = parseInt($disp.text(), 10) || 0;
      qty += 1;
      $disp.text(qty);
      // small highlight animation
      $existing.first().css('background-color', '#f1fff1');
      setTimeout(() => $existing.first().css('background-color', ''), 220);
      calculateTotals();
      return;
    }

    // build new order-item html
    const $li = $(
      '\n<li class="order-item d-flex justify-content-between align-items-center mb-3">' +
        '<div class="d-flex align-items-start item-info gap-3">' +
          '<img src="' + imgSrc + '" alt="' + name + '" class="item-img me-2">' +
          '<div class="item-content">' +
            '<div class="d-flex align-items-start justify-content-between">' +
              '<span class="item-name">' + name + '</span>' +
              '<button class="btn p-0 remove-btn ms-2" aria-label="remove item"><i class="bi bi-trash-fill"></i></button>' +
            '</div>' +
            '<div class="d-flex align-items-center gap-2 mt-1">' +
              '<span class="item-price">' + priceText + '</span>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="qty-controls d-flex align-items-center">' +
          '<button class="qty-btn" aria-label="decrease"><i class="bi bi-dash"></i></button>' +
          '<div class="qty-display">1</div>' +
          '<button class="qty-btn" aria-label="increase"><i class="bi bi-plus"></i></button>' +
        '</div>' +
      '</li>\n'
    );

    // append and show
    $('.order-details ul').append($li.hide());
    $li.fadeIn(200);
    calculateTotals();
  });
