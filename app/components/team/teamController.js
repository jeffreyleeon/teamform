angular.module('teamform-app')
.controller('TeamCtrl', ['$scope', 'currentUser', 'teamformDb', TeamCtrl]);

function TeamCtrl($scope, currentUser, teamformDb) {
    var vm = this;

    vm.param = {
      eventName: '',  
      teamName : '',
      currentTeamSize : 0,
      teamMembers : []
    };
    vm.param.teamName = getURLParameter("team"); 
    vm.param.eventName = getURLParameter("q");

    teamformDb.getEventAdminData(vm.param.eventName, function(data) {    
        if ( data.child("param").val() != null ) {
            vm.range = data.child("param").val();
            vm.param.currentTeamSize = parseInt((vm.range.minTeamSize + vm.range.maxTeamSize)/2);
            $scope.$apply(); // force to refresh
        } 
    });
    
    vm.currentUser = currentUser.getCurrentUser();
    vm.team = teamformDb.getTeam(vm.param.eventName, vm.param.teamName);
    vm.member = teamformDb.getAllMembers(vm.param.eventName);
    vm.member.$loaded()
      .then( function(data) {
        vm.loadFunc();
      }) 
      .catch(function(error) {
      });
    
    vm.requests = [];
    vm.refreshViewRequestsReceived = refreshViewRequestsReceived;
    vm.loadFunc = loadFunc;
    vm.saveFunc = saveFunc;
    vm.processRequest = processRequest;
    vm.removeMember = removeMember;
    vm.updateRemovedMember = updateRemovedMember;
    vm.getMemberData = getMemberData;
    vm.isTeamLeader = isTeamLeader;
    vm.isLoggedIn = isLoggedIn;
    vm.isMe = isMe;
    vm.containsRequiredSkills = containsRequiredSkills;

    function refreshViewRequestsReceived() {
        vm.requests = [];
        var teamID = vm.param.teamName;
        $.each(vm.member, function(i,obj) {         
            var userID = obj.$id;
            if ( typeof obj.selection != "undefined"  && obj.selection.indexOf(teamID) > -1 ) {
                vm.requests.push(userID);
            }
        });
    }

    function loadFunc() {
        if (vm.team.size != null) {
          vm.param.currentTeamSize = vm.team.size;
          vm.refreshViewRequestsReceived();
        }
        if (vm.team.teamMembers != null) {
          vm.param.teamMembers = vm.team.teamMembers;
        }
    }

    function saveFunc() {
      // for each team members, clear the selection in /[eventName]/team/
      $.each(vm.param.teamMembers, function(i,obj){
          var rec = vm.member.$getRecord(obj);
          rec.selection = [];
          rec.joinedTeam = true;
          vm.member.$save(rec);
      });
      vm.team.size = vm.param.currentTeamSize;
      vm.team.teamMembers = vm.param.teamMembers;
      vm.team.$save();
      vm.refreshViewRequestsReceived();
    }

    function processRequest(requestMemberID) {
        if (vm.param.teamMembers.indexOf(requestMemberID) < 0 && 
            vm.param.teamMembers.length < vm.param.currentTeamSize) {
            // Not exists, and the current number of team member is less than the preferred team size
            vm.param.teamMembers.push(requestMemberID);
            vm.saveFunc();
        }
    }

    function removeMember(teamMemberID) {
        var index = vm.param.teamMembers.indexOf(teamMemberID);
        if ( index > -1 ) {
            vm.param.teamMembers.splice(index, 1); // remove that item
            vm.updateRemovedMember(teamMemberID);
            vm.saveFunc();
        }
    }

    function updateRemovedMember(teamMemberID) {
      var rec = vm.member.$getRecord(teamMemberID);
      rec.joinedTeam = false;
      vm.member.$save(rec);
    }

    function getMemberData(memberID) {
      var payload = {
        name: '',
        introduction: '',
        skills: [],
      };
      for (var i = 0; i < vm.member.length; i++) {
        var member = vm.member[i];
        if (member.$id === memberID) {
          payload.name = member.name;
          payload.introduction = member.introduction;
          payload.skills = member.skills;
        }
      }
      return payload;
    }

    function isTeamLeader() {
      if (!vm.isLoggedIn()) {
        console.log('1113project/teamController/isTeamLeader: You are not logged in');
        return false;
      }
      return vm.team.teamOwner === vm.currentUser.$id;
    }

    function isLoggedIn() {
      return currentUser.isLoggedIn();
    }

    function isMe(memberID) {
      return vm.currentUser.$id === memberID;
    }

    function containsRequiredSkills(skills) {
      if (!skills && !Array.isArray(skills)) {
        return false;
      }
      for (var i = 0; i < skills.length; i++) {
        var userSkill = skills[i];
        if (vm.team.skills.indexOf(userSkill) > -1) {
          // Contains skill
          return true;
        }
      }
      return false;
    }
}