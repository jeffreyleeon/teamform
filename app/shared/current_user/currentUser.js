angular.module('current-user', [])
.factory('currentUser', CurrentUser);

function CurrentUser() {
  var _user = {};
  var service = {
    setCurrentUser: setCurrentUser,
  };
  return service;

  function setCurrentUser(user) {
    console.log('====update current user: ', user);
    _user = user;
  }
}