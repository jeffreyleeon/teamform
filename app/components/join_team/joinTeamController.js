angular.module('teamform-app')
.controller('JoinTeamCtrl', ['currentUser', 'teamformDb', JoinTeamCtrl]);

function JoinTeamCtrl(currentUser, teamformDb) {
    var vm = this;

    vm.eventName = getURLParameter("q");
    vm.currentUser = currentUser.getCurrentUser();
    vm.selection = [];
    vm.teams = {};
    vm.skillsString = '';
    vm.introduction = '';

    vm.getMember = getMember;
    vm.getMember(vm.eventName, vm.currentUser.$id);
    vm.saveFunc = saveFunc;
    vm.refreshTeams = refreshTeams;
    vm.refreshTeams(); // call to refresh teams...

    function getMember(eventName, userID) {
      teamformDb.getMember(eventName, userID, function(data) {
        if (data.child("selection").val() != null ) {
          vm.selection = data.child("selection").val();
        }
        else {
          vm.selection = [];
        }
      });
    }

    function saveFunc() {
        var userID = vm.currentUser.$id;
        var userName = vm.currentUser.display_name;
        if ( userID !== '' && userName !== '' ) {
          var newData = {             
              'name': userName,
              'selection': vm.selection
          };
          teamformDb.setMemberData(vm.eventName, userID, newData, function(){
            window.history.back();
          });
        }
    }

    function refreshTeams() {
        // Link and sync a firebase object
        vm.selection = [];      
        vm.toggleSelection = function (item) {
            var idx = vm.selection.indexOf(item);    
            if (idx > -1) {
                vm.selection.splice(idx, 1);
            }
            else {
                vm.selection.push(item);
            }
        }
        vm.teams = teamformDb.getAllTeams(vm.eventName);
    }    
}