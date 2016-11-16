angular.module('teamform-db', ['firebase'])
.factory('teamformDb', ['$firebaseObject', '$firebaseArray', TeamformDb]);

function TeamformDb($firebaseObject, $firebaseArray) {
	initalizeFirebase();

  var eventScope = 'events/';
  var userScope = 'user/';
  var passwordSalt = 'comp3111';

  var service = {
    loginWithFacebook: loginWithFacebook,
    saveNewFBUser: saveNewFBUser,
    saveNewUser: saveNewUser,
    _saltedPassword: _saltedPassword,
    getUser: getUser,
    saveNewEvent: saveNewEvent,
    getEvent: getEvent,
    isEventExist: isEventExist,
    getAllEvents: getAllEvents,
    getEventAdminData: getEventAdminData,
    getAllTeams: getAllTeams,
    getTeam: getTeam,
    setTeamData: setTeamData,
    addTeamAnnouncement: addTeamAnnouncement,
    deleteTeamAnnouncement: deleteTeamAnnouncement,
    getAllTeamAnnouncement: getAllTeamAnnouncement,
    getAllMembers: getAllMembers,
    getMember: getMember,
    setMemberData: setMemberData,
    getAllUsers: getAllUsers,
    updateFirebase: updateFirebase,
  };
  return service;

  function loginWithFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    // firebase.auth().signOut();
    return firebase.auth().signInWithPopup(provider);
  }

  function saveNewFBUser(
    fbID,
    name,
    email,
    profilePicUrl,
    token,
    refreshToken,
    callback) {
    var refPath = "user/" + fbID;
    var data = {
        'fb_id': fbID,
        'fb_name': name,
        'display_name': name,
        'email': email,
        'profile_pic_url': profilePicUrl,
        'token': token,
        'refresh_token': refreshToken,
        'created_at': Date.now(),
    };
    service.updateFirebase(refPath, data, callback);
  }

  function saveNewUser(hashId, username, email, password, callback) {
    var refPath = "user/" + hashId;
    var saltedPassword = service._saltedPassword(password);
    console.log('=======salted ', saltedPassword);
    var data = {
        'display_name': username,
        'email': email,
        'password': saltedPassword,
        'created_at': Date.now(),
    };
    service.updateFirebase(refPath, data, callback);
  }

  function _saltedPassword(password) {
    var saltedPassword = '';
    for (var i = 0; i < password.length; i++) {
      pwChar = password[i];
      // saltChar = 'a';
      saltChar = passwordSalt[i % passwordSalt.length];
      var calculatedAsciiValue = pwChar.charCodeAt(0) + saltChar.charCodeAt(0);
      var newChar = String.fromCharCode(calculatedAsciiValue % 255);
      saltedPassword += newChar;
    }
    console.log('==========password is ', saltedPassword);
    return saltedPassword;
  }

  function getUser(userID) {
    var refPath =  'user/' + userID;
    ref = firebase.database().ref(refPath);
    var param = $firebaseObject(ref);
    return param;
  }

  function saveNewEvent(eventName, payload, callback) {
    var refPath = _getEventParamsPath(eventName);
    service.updateFirebase(refPath, payload, callback);
  }

  function isEventExist(eventName) {
    var refPath = _getEventParamsPath(eventName);
    var arr = $firebaseArray(firebase.database().ref(refPath));
    return new Promise(function (resolve, reject) {
        arr.$loaded().then(function(data) {
          resolve(data.length > 0);
        }, function(error) {
          resolve(false);
        });
    });
  }

  function getEvent(eventName) {
  	var refPath = _getEventParamsPath(eventName);
  	ref = firebase.database().ref(refPath);
  	var param = $firebaseObject(ref);
  	return param;
  }

  function getAllEvents() {
    var refPath = eventScope;
    return $firebaseArray(firebase.database().ref(refPath));
  }

  function getEventAdminData(eventName, callback) {
  	var refPath =  eventScope + eventName + "/admin";
  	// retrieveOnceFirebase(firebase, refPath, callback);
    firebase.database().ref(refPath).once("value").then(callback);
  }

  function getAllTeams(eventName) {
  	var refPath = eventScope + eventName + '/team';
    return $firebaseArray(firebase.database().ref(refPath));
  };

  function getTeam(eventName, teamID) {
		var refPath = eventScope + eventName + "/team/" + teamID;
    ref = firebase.database().ref(refPath);
    var param = $firebaseObject(ref);
    return param;
  };

  function setTeamData(eventName, teamID, data, callback) {
    var refPath = eventScope + eventName + "/team/" + teamID;
    service.updateFirebase(refPath, data, callback);
  };

  function addTeamAnnouncement(eventName,urgency,content){    
    var randomId = Math.floor((Math.random() * 100000000000));
    var refPath = eventScope + eventName + "/announcement/" + randomId;
    var data = {
      'announcementId': randomId,
      'urgency': urgency,
      'announcementContent': content,
    };

    service.updateFirebase(refPath,data,function(){
        console.log("Success!");
    });
  }

  function deleteTeamAnnouncement(eventName,announcementId){
    var refPath = eventScope + eventName + "/announcement/" + announcementId;
    firebase.database().ref(refPath).remove();
  }

  function getAllTeamAnnouncement(eventName){
      var refPath = eventScope + eventName + "/announcement";
      return $firebaseArray(firebase.database().ref(refPath));
  }

  function getAllMembers(eventName) {
  	var refPath = eventScope + eventName + "/member";
    return $firebaseArray(firebase.database().ref(refPath));
  };

  function getMember(eventName, userID, callback) {
  	var refPath = eventScope + eventName + "/member/" + userID;
    // retrieveOnceFirebase(firebase, refPath, callback);
    firebase.database().ref(refPath).once("value").then(callback);
  }

  function setMemberData(eventName, userID, data, callback) {
  	var refPath = eventScope + eventName + "/member/" + userID;
    service.updateFirebase(refPath, data, callback);
  }

  function getAllUsers() {
    var refPath = userScope;
    return $firebaseArray(firebase.database().ref(refPath));
  }

  function updateFirebase(refPath, payload, callback) {
    var ref = firebase.database().ref(refPath);
    ref.update(payload, callback);
  }

  function _getEventParamsPath(eventName) {
    return eventScope + eventName + "/admin/param";
  }
}
