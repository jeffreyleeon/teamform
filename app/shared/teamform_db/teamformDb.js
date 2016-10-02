angular.module('teamform-db', [])
.factory('teamformDb', ['$firebaseObject', '$firebaseArray', TeamformDb]);

function TeamformDb($firebaseObject, $firebaseArray) {
  var someValue = 'this is the value';
  var service = {
    talk: talk,
    someValue: someValue,
  };
  return service;

  function talk() {
      console.log('=======talking');
  };
}