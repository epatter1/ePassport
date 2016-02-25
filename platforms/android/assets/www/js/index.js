/*
author: Elisha Patterson
 ePassport App!!
 version 1
 QR CODE DOES NOT WORK YET
 
 Yay!!
 */
 
var resultDiv

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
		$('#sendBtn').on("click", sendMail);
		document.querySelector("#qrCode").addEventListener("touchend", scan, false);
		resultDiv = document.querySelector("#report");
		
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		document.getElementsByClassName("white").style.color ='#FFFFFF';
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        console.log('Received Event: ' + id);
		document.getElementById("greenBtn").style.background='#3F6826';
		
    }
};

function sendMail() {
	console.log("Running sendMail function...")
	if(validateEmail())
	{
	//collect all field info
	var to = document.getElementById('toAddress').value;
	
	// validate email address	
	
	// call native email app using email composer plugin
	console.log("sedning email to:" + to);
	cordova.plugins.email.open({
		to: to,
		subject: 'email subject line'
	});
	console.log("done running sendMail() ...");

	}

	else {
	alert("Please enter a valid email address");
	}
}


//SOURCE: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
function validateEmail()
{
	var x = document.forms["myForm"]["profEmail"].value;
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	return re.test(x);
}

// QR Code scanner
function scan() {
	
cordova.plugins.barcodeScanner.scan(
      function (report) {
          var rep = ("We got a barcode\n" +
                "Result: " + report.text + "\n" +
                "Format: " + report.format + "\n" +
                "Cancelled: " + report.cancelled);
				resultDiv.innerHTML = rep;
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
}

// QR Code scanner
/* function scan() {
	
cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
}
// QR code method for successful and unsuccessful scans
 function encode {
 cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com", function(success) {
            alert("encode success: " + success);
          }, function(fail) {
            alert("encoding failed: " + fail);
          }
        );
 } */

/* //QR Code reader
module.controller('BarcodeCtrl', function($scope, $cordovaBarcodeScanner) {

  document.addEventListener("deviceready", function () {

    $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) {
        // Success! Barcode data is here
      }, function(error) {
        // An error occurred
      });


    // NOTE: encoding not functioning yet
    $cordovaBarcodeScanner
      .encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com")
      .then(function(success) {
        // Success!
      }, function(error) {
        // An error occurred
      });

  }, false);
}); */


app.initialize();

