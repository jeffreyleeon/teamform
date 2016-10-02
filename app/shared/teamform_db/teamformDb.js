angular.module('teamform-db', ['app-models', 'firebase'])
.factory('teamformDb', ['$firebaseObject', '$firebaseArray', 'modelsFactory', TeamformDb]);

function TeamformDb($firebaseObject, $firebaseArray, modelsFactory) {
	initalizeFirebase();
  var service = {
    getEvent: getEvent,
    getEventAdminData: getEventAdminData,
    getAllTeams: getAllTeams,
    getTeam: getTeam,
    setTeamData: setTeamData,
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

  function getEventAdminData(eventName, callback) {
  	var refPath =  eventName + "/admin";
  	retrieveOnceFirebase(firebase, refPath, callback);
  }

  function getAllTeams(eventName) {
  	var refPath = eventName + '/team';
    return $firebaseArray(firebase.database().ref(refPath));
  };

  function getTeam(eventName, teamID, callback) {
		var refPath = eventName + "/team/" + teamID;
		retrieveOnceFirebase(firebase, refPath, callback);
  };

  function setTeamData(eventName, teamID, data, callback) {
    var refPath = eventName + "/team/" + teamID; 
    var ref = firebase.database().ref(refPath);
    ref.set(data, callback);
  };

  function getAllMembers(eventName) {
  	var refPath = eventName + "/member";
    return $firebaseArray(firebase.database().ref(refPath));
  };
}