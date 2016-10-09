angular.module('teamform-login-app', ['teamform-db'])
.controller('LoginCtrl', ['$scope', 'teamformDb', LoginCtrl]);

function LoginCtrl($scope, teamformDb) {
    var vm = this;
    vm.errorMsg = '';
    vm.login = login;
    
    function login() {
        vm.errorMsg = '';
        teamformDb.loginWithFacebook().then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log('=====success ', token , user);
          // window.location.href= "index.html";
        }).catch(function(error) {
          // Handle Errors here.
          // var errorCode = error.code;
          var errorMessage = error.message;
          // var email = error.email;
          // var credential = error.credential;
          setMessage(errorMessage);
          $scope.$apply();
        });
    }

    function setMessage(msg) {
      vm.errorMsg = msg;
    }
}