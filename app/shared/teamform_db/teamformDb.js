angular.module('teamform-db', ['app-models', 'firebase'])
.factory('teamformDb', ['$firebaseObject', '$firebaseArray', 'modelsFactory', TeamformDb]);

function TeamformDb($firebaseObject, $firebaseArray, modelsFactory) {
	initalizeFirebase();
  var service = {
    getEvent: getEvent,
    getAllTeams: getAllTeams,
    getAllMembers: getAllMembers,
  };
  return service;

  function getEvent(eventName) {
  	var refPath = eventName + "/admin/param";
  	ref = firebase.database().ref(refPath);
  	var event = new modelsFactory.Event();
  	param = $firebaseObject(ref);
  	event.setFirebaseObject(param);
  	return event;
  }

  function getAllTeams(eventName) {
  	var refPath = eventName + '/team';
    return $firebaseArray(firebase.database().ref(refPath));
  };

  function getAllMembers(eventName) {
  	var refPath = eventName + "/member";
    return $firebaseArray(firebase.database().ref(refPath));
  };
}