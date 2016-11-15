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

    // New registered user specific
    vm.register = register;
    vm.newUserName = '';
    vm.newUserEmail = '';
    vm.newPassword = '';
    // Login specific
    vm.loginUserName = '';
    vm.loginPassword = '';
    vm.loginErrorMsg = '';
    vm.users = teamformDb.getAllUsers();
    
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

    function register(username, email, password) {
      var randomId = Math.random().toString(36).slice(2);
      teamformDb.saveNewUser(randomId, username, email, password, function() {
          var savedUser = teamformDb.getUser(randomId);
          currentUser.setCurrentUser(savedUser);
          setTimeout(function() {
            window.location.href= "index.html";
          }, 1000);
      });
    }

    function login(username, password) {
      var saltedPassword = teamformDb._saltedPassword(password);
      for (var i = 0; i < vm.users.length; i++) {
        var targetUser = vm.users[i];
        console.log('========targetUser.password ', targetUser.password);
        console.log('========saltedPassword ', saltedPassword);
        if (targetUser.display_name === username && targetUser.password === saltedPassword) {
          currentUser.setCurrentUser(targetUser);
          setTimeout(function() {
            window.location.href= "index.html";
          }, 1000);
          return;
        }
      };
      vm.loginErrorMsg = 'Wrong username or password';
    }

    function setMessage(msg) {
      vm.errorMsg = msg;
    }

}
