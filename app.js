var app = angular.module('plunker', ['ngFacebook']);
//http://ngmodules.org/modules/ngFacebook

app.config( function( $facebookProvider ) {
  $facebookProvider.setAppId('151080118575990');
  $facebookProvider.setPermissions("public_profile,email");
})

app.run( function( $rootScope ) {
  // Load the facebook SDK asynchronously
  (function(){
     // If we've already installed the SDK, we're done
     if (document.getElementById('facebook-jssdk')) {return;}

     // Get the first script element, which we'll use to find the parent node
     var firstScriptElement = document.getElementsByTagName('script')[0];

     // Create a new script element and set its id
     var facebookJS = document.createElement('script'); 
     facebookJS.id = 'facebook-jssdk';

     // Set the new script's source to the source of the Facebook JS SDK
     facebookJS.src = '//connect.facebook.net/en_US/all.js';

     // Insert the Facebook JS SDK into the DOM
     firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
   }());
});


app.controller('MainCtrl', function($scope,$facebook) {
  $scope.name = 'World';
  
  $scope.isLoggedIn = false;
  $scope.login = function() {
    $facebook.login().then(function() {
      refresh();
    });
  }
  
  $scope.logout = function() {
     $facebook.logout().then(function(response) {
       refresh();
       $scope.isLoggedIn = false;
       status();
    });
  }
  
 function status() {
     $facebook.getLoginStatus().then(function(response) {
       $scope.loginStatus = response.status;
    });
  }
  
  function refresh() {
    //se quiser o /me retorna so o campo name
    $facebook.api("/me?fields=name,email").then( 
      function(response) {
        $scope.welcomeMsg = "Welcome " + response.name + " - " + response.email;
        $scope.isLoggedIn = true;
        status();
      },
      function(err) {
        $scope.welcomeMsg = "Please log in";
      });
  }
  
  refresh();
  
});


