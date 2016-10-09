angular.module('current-user', [])
.factory('currentUser', CurrentUser);

function CurrentUser() {
  var _user = {};
  var service = {
    getCurrentUser: getCurrentUser,
    setCurrentUser: setCurrentUser,
  };
  return service;

  function getCurrentUser() {
    return _user;
  }

  function setCurrentUser(user) {
    console.log('====update current user: ', user);
    _user = user;
  }
}