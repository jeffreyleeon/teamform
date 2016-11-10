angular.module('teamform-login-app', ['teamform-db', 'current-user'])
.controller('LoginCtrl', ['$scope', 'teamformDb', 'currentUser', LoginCtrl]);


function LoginCtrl($scope, teamformDb, currentUser, $window) {
    var vm = this;
    vm.errorMsg = '';
    vm.login = login;
    vm.saveNewFBUser = saveNewFBUser;
    vm.setMessage = setMessage;
    $scope.user = {
      username: '',
      email: '',
      pass: '',
      confirmpass: ''
    };
    $scope.newerrorMsg ='default';
    
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
          var savedUser = teamformDb.getUser(user.uid);
          currentUser.setCurrentUser(savedUser);
          setTimeout(function() {
            window.location.href= "index.html";
          }, 1000);
        }
        );
    }

    function setMessage(msg) {
      vm.errorMsg = msg;
    }

    //angularjs version for register() with bugs
    $scope.newregister = function(){
      if($scope.user.pass==$scope.user.confirmpass && $scope.user.username!=''){
        setTimeout(function() {
            window.location.href= "registersuccessfu_page.html";
          }, 1000);
      }
      
    }

}

// function newregister ($username, $pass, $confirmpass){
//       if($pass==$confirmpass && $username!=''){
//         window.open('index.html','_self');        
//       }
      
//     }
