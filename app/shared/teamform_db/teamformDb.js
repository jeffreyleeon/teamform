angular.module('teamform-db', [])
.factory('teamformDb', ['$firebaseObject', '$firebaseArray', TeamformDb]);

function TeamformDb($firebaseObject, $firebaseArray) {
	initalizeFirebase();
  var service = {
    getAllTeams: getAllTeams,
    getAllMembers: getAllMembers,
  };
  return service;

  function getAllTeams(eventName) {
  	var refPath = eventName + '/team';
    return $firebaseArray(firebase.database().ref(refPath));
  };

  function getAllMembers(eventName) {
  	var refPath = eventName + "/member";
    return $firebaseArray(firebase.database().ref(refPath));
  };
}