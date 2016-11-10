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
    vm.joinedTeam = false;

    vm.getMember = getMember;
    vm.getMember(vm.eventName, vm.currentUser.$id);
    vm._parseSkills = _parseSkills;
    vm.saveFunc = saveFunc;
    vm.isJoinedTeam = isJoinedTeam;
    vm.refreshTeams = refreshTeams;
    vm.refreshTeams(); // call to refresh teams...

    function getMember(eventName, userID) {
      teamformDb.getMember(eventName, userID, function(data) {
        var selectionKey = 'selection';
        var skillsKey = 'skills';
        var introKey = 'introduction';
        var joinedTeamKey = 'joinedTeam';
        if (data.child(selectionKey).val() != null ) {
          vm.selection = data.child(selectionKey).val();
        } else {
          vm.selection = [];
        }
        if (data.child(skillsKey).val() != null) {
          var skills = data.child(skillsKey).val();
          vm.skillsString = skills.join();
        } else {
          vm.skillsString = (vm.currentUser.skills && vm.currentUser.skills.join()) || '';
        }
        if (data.child(introKey).val() != null) {
          vm.introduction = String(data.child(introKey).val());
        } else {
          vm.introduction = '';
        }
        vm.joinedTeam = data.child(joinedTeamKey).val();
      });
    }

    function saveFunc() {
        var userID = vm.currentUser.$id;
        var userName = vm.currentUser.display_name;
        var skills = vm._parseSkills(vm.skillsString);
        var introduction = vm.introduction;
        if ( userID !== '' && userName !== '' ) {
          var newData = {             
              'name': userName,
              'selection': vm.selection,
              'skills': skills,
              'introduction': introduction,
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

    function isJoinedTeam() {
      return !!vm.joinedTeam;
    }

    function _parseSkills(skills) {
        var arr = skills.split(',');
        for (var i = arr.length - 1; i >= 0; i--) {
            arr[i] = arr[i].replace(/^[ ]+|[ ]+$/g,'');
        }
        return arr;
    }
}