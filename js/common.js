
function addRecWishlist()
{
  //console.log("json data upload start...");
  var counter = 0;
  var cjson = "https://api.mlab.com/api/1/databases/beohar/collections/wishlist?apiKey=b_5fGGEMccYn-IyQ9ZcaXDwtBYOwcipK&c=true";
  var jqxhr = $.getJSON( cjson, function(data1) {
  //console.log( "success" );
  counter = data1;
})
  .done(function() {
    //console.log( "second success" );

    var cust_email = $('#cust_email').val();
    var cust_mobile = $('#cust_mobile').val();
    var cart_value = $('#cart_value').val();
    var cust_wlist = $('#cust_wlist').val();

    var udata = {};
    udata.cust_id = counter;
    udata.cust_name = "";
    udata.cust_address = "";
    udata.note = "";
    udata.email = cust_email;
    udata.mobile = cust_mobile;
    udata.cart_value = cart_value;
    udata.wishlist_books = cust_wlist;
    udata.delivered = 0;
    
    //console.log(udata);
    $.ajax( { url: "https://api.mlab.com/api/1/databases/beohar/collections/wishlist?apiKey=b_5fGGEMccYn-IyQ9ZcaXDwtBYOwcipK",
        data: JSON.stringify( udata ),
        type: "POST",
        contentType: "application/json" } );

    $('#send-button').addClass('disabled');
    $('#sent-msg').fadeIn(1000);
    setTimeout(pageReload, 5000);

  })
  .fail(function() {
    //console.log( "error" );
  })
  .always(function() {
    //console.log( "complete" );
  });
}


function pageReload() {
  location.reload();
}

function addRecWishlist_1()
{
  $.ajax( { url: "https://api.mlab.com/api/1/databases/beohar/collections/wishlist?apiKey=b_5fGGEMccYn-IyQ9ZcaXDwtBYOwcipK",
      data: JSON.stringify( {
    "cust_id": 0,
    "email": "email_1@gmail.com",
    "mobile": 9000000008,
    "cart_value": 0,
    "wishlist_books": [23, 12]
  } ),
      type: "POST",
      contentType: "application/json" } );
}
