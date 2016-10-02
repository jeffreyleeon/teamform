angular.module('teamform-db', ['firebase'])
.factory('teamformDb', ['$firebaseObject', '$firebaseArray', TeamformDb]);

function TeamformDb($firebaseObject, $firebaseArray) {
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
  	var param = $firebaseObject(ref);
  	return param;
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