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
          var user = result.user;
          saveNewFBUser(user, token);
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

    function saveNewFBUser(user, token) {
      teamformDb.saveNewFBUser(
        user.uid,
        user.displayName,
        user.email,
        user.photoURL,
        token,
        user.refreshToken,
        function() {
          console.log('=====ok wor ');
          
          // window.location.href= "index.html";
        }
        );
    }

    function setMessage(msg) {
      vm.errorMsg = msg;
    }
}