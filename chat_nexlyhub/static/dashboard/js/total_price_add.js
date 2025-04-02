
  $(document).ready(function() {
  // Initialize total price
  var totalPrice = parseFloat($('#total-price').val());

  // Event handler for addon selection
  $('input[name="addons"]').change(function() {
    var addonPrice = parseFloat($(this).siblings('.hwe__select-addon--box').find('.hwe__h1').text().replace('$', ''));

    if ($(this).is(':checked')) {
      // Add addon price to total
      totalPrice += addonPrice;
    } else {
      // Subtract addon price from total
      totalPrice -= addonPrice;
    }

    // Update total price
    $('.hwe__addon-order--box .hwe__h5').text('Total: $' + totalPrice.toFixed(2));
  });

});
