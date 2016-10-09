angular.module('teamform-admin-app', ['teamform-db', 'firebase'])
.controller('AdminCtrl', ['teamformDb', AdminCtrl]);

function AdminCtrl(teamformDb) {
    var vm = this;
    // TODO: implementation of AdminCtrl
    var eventName = getURLParameter("q");
    vm.event = teamformDb.getEvent(eventName);
    vm.event.$loaded()
        .then(function(data) {
            // Enable the UI when the data is successfully loaded and synchornized
            vm.event.maxTeamSize |= 10;
            vm.event.minTeamSize |= 1;
            $('#admin_page_controller').show();               
        }) 
        .catch(function(error) {
            // Database connection error handling...
            //console.error("Error:", error);
        });

    vm.team = teamformDb.getAllTeams(eventName);
    vm.member = teamformDb.getAllMembers(eventName);
    
    vm.changeMinTeamSize = changeMinTeamSize;
    vm.changeMaxTeamSize = changeMaxTeamSize;
    vm.saveFunc = saveFunc;

    function changeMinTeamSize(delta) {
        var newVal = vm.event.minTeamSize + delta;
        if (newVal >=1 && newVal <= vm.event.maxTeamSize ) {
            vm.event.minTeamSize = newVal;
        } 
        vm.event.$save();
    }

    function changeMaxTeamSize(delta) {
        var newVal = vm.event.maxTeamSize + delta;
        if (newVal >=1 && newVal >= vm.event.minTeamSize ) {
            vm.event.maxTeamSize = newVal;
        } 
        vm.event.$save();
    }
    
    function saveFunc() {
        // var provider = new firebase.auth.FacebookAuthProvider();
        // firebase.auth().signInWithPopup(provider).then(function(result) {
        //   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        //   var token = result.credential.accessToken;
        //   // The signed-in user info.
        //   var user = result.user;
        //   console.log('=====success ', token , user);
        //   // ...
        // }).catch(function(error) {
        //   // Handle Errors here.
        //   var errorCode = error.code;
        //   var errorMessage = error.message;
        //   // The email of the user's account used.
        //   var email = error.email;
        //   // The firebase.auth.AuthCredential type that was used.
        //   var credential = error.credential;
        //   console.log('=====failed ', errorCode , errorMessage);
        //   // ...
        // });
        // return;
        vm.event.$save();
        // Finally, go back to the front-end
        window.location.href= "index.html";
    }
}