angular.module('teamform-app')
.controller('ShowEventCtrl', ['$scope', 'currentUser', 'teamformDb', ShowEventCtrl]);

function ShowEventCtrl($scope, currentUser, teamformDb) {
    var vm = this;

    vm.eventName = getURLParameter("id");
    vm.event = teamformDb.getEvent(vm.eventName);
    vm.currentUser = currentUser.getCurrentUser();

    vm.teams = teamformDb.getAllTeams(vm.eventName);
    vm.members = teamformDb.getAllMembers(vm.eventName);

    vm.displaySkills = displaySkills;
    vm.isMyTeam = isMyTeam;
    vm.isMyEvent = isMyEvent;
    vm.getMemberData = getMemberData;
    vm.searchText = '';

    function displaySkills(skills) {
    	if (!skills) {
    		return '';
    	}
    	return skills.join(', ');
    }

    function isMyTeam(team) {
    	return team.teamOwner === vm.currentUser.$id;
    }

    function isMyEvent(event) {
      return event.eventOwner === vm.currentUser.$id;
    }

    function getMemberData(memberID) {
      var payload = {
        name: '',
        introduction: '',
        skills: [],
      };
      for (var i = 0; i < vm.members.length; i++) {
        var member = vm.members[i];
        if (member.$id === memberID) {
          payload.name = member.name;
          payload.introduction = member.introduction;
          payload.skills = member.skills;
        }
      }
      return payload;
    }
}
