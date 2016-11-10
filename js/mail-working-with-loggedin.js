var clientId = '112164362400-rrhi6nlmar1s82uggt9q389rkgkeuvuf.apps.googleusercontent.com';
      //var apiKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
      var scopes = 'https://www.googleapis.com/auth/gmail.send';

      function handleClientLoad() {
        //gapi.client.setApiKey(apiKey);
        window.setTimeout(checkAuth, 1);
      }

      function checkAuth() {
        gapi.auth.authorize({
          client_id: clientId,
          scope: scopes,
          immediate: true
        }, handleAuthResult);
      }

      function handleAuthClick() {
        gapi.auth.authorize({
          client_id: clientId,
          scope: scopes,
          immediate: false
        }, handleAuthResult);
        return false;
      }

      function handleAuthResult(authResult) {
        if(authResult && !authResult.error) {
          loadGmailApi();
          $('#authorize-button').remove();
          $('.table-inbox').removeClass("hidden");
          $('#compose-button').removeClass("hidden");
        } else {
          $('#authorize-button').removeClass("hidden");
          $('#authorize-button').on('click', function(){
            handleAuthClick();
          });
        }
      }

      function loadGmailApi() {
        gapi.client.load('gmail', 'v1');
      }

      

      function sendEmail1()
      {
        var cust_wlist = $('#cust_wlist').val();
        var cust_email = $('#cust_email').val();
        var cust_mobile = $('#cust_mobile').val();
        var cart_value = $('#cart_value').val();
        sendMessage(
          {
            'To': 'priyesh.beohar@gmail.com',
            'Subject': 'beohar.netai.net : Customer books wishlist'
          },
          '\n\nEmail : ' + cust_email +
          '\n\nMobile: ' + cust_mobile +
          '\n\nTotal cart value: ' + cart_value +
          '\n\n' + cust_wlist,
          composeTidy
        );
        $('#send-button').addClass('disabled');
        $('#sent-msg').fadeIn(1000);
        setTimeout(pageReload, 5000);
 
        return false;
      }

      function pageReload() {
        location.reload();
      }


      function composeTidy()
      {
        $('#compose-modal').modal('hide');

        $('#compose-to').val('');
        $('#compose-subject').val('');
        $('#compose-message').val('');

        $('#send-button').removeClass('disabled');
      }

function sendMessage(userId, email, callback) {
  var base64EncodedEmail = btoa(email);
  var request = gapi.client.gmail.users.messages.send({
    'userId': userId,
    'message': {
      'raw': base64EncodedEmail
    }
  });
  request.execute(callback);
}
      function sendMessage_1(headers_obj, message, callback)
      {
        var email = '';

        for(var header in headers_obj)
          email += header += ": "+headers_obj[header]+"\r\n";

        email += "\r\n" + message;

        var sendRequest = gapi.client.gmail.users.messages.send({
          'userId': 'me',
          'resource': {
            'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
          }
        });

        return sendRequest.execute(callback);
      }

      function getHeader(headers, index) {
        var header = '';
        $.each(headers, function(){
          if(this.name.toLowerCase() === index.toLowerCase()){
            header = this.value;
          }
        });
        return header;
      }

      function getBody(message) {
        var encodedBody = '';
        if(typeof message.parts === 'undefined')
        {
          encodedBody = message.body.data;
        }
        else
        {
          encodedBody = getHTMLPart(message.parts);
        }
        encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
        return decodeURIComponent(escape(window.atob(encodedBody)));
      }

      function getHTMLPart(arr) {
        for(var x = 0; x <= arr.length; x++)
        {
          if(typeof arr[x].parts === 'undefined')
          {
            if(arr[x].mimeType === 'text/html')
            {
              return arr[x].body.data;
            }
          }
          else
          {
            return getHTMLPart(arr[x].parts);
          }
        }
        return '';
      }

function addRec()
{
  $.ajax( { url: "https://api.mlab.com/api/1/databases/beohar/collections/books?apiKey=b_5fGGEMccYn-IyQ9ZcaXDwtBYOwcipK",
      data: JSON.stringify( {
    "book_id": 3,
    "author_details": "Bond, Ruskin",
    "title": "Rupa Book of Heartwarming Stories, The",
    "isbn": 9798129107526,
    "publisher": "Hachette India",
    "date_published": 2012,
    "rating": 0,
    "signed": 0,
    "description": "Bring on the celebrations - it's Durga Puja and Dussehra time! Ten whole days for fun and festivities and for thanking the gods and goddesses for their blessing. From fasting to feasting, from Rama dramas to burning Ravanas, from exchanging gifts, different people in different parts of the worl celebrate these festivals in all kinds of ways and you can know all about it! This book brings you wonderful stories about Dussehra and Durga Puja...Can you solve the case of the stolen idol? Or imaging a private mother goddess? Or figure out how festivals can help you be the most awesome person you can be? Or work out ways to fight a monster you can't see and win? It's all here!",
    "sold": 0,
    "notes": "",
    "mrp": 200,
    "ourprice": 100
  } ),
      type: "POST",
      contentType: "application/json" } );
  refresh();
}