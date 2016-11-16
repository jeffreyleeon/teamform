angular.module('teamform-app')
.controller('ShowEventCtrl', ['$scope', 'currentUser', 'teamformDb', ShowEventCtrl]);

function ShowEventCtrl($scope, currentUser, teamformDb) {
    var vm = this;

    vm.eventName = getURLParameter("id");
    vm.event = teamformDb.getEvent(vm.eventName);
    vm.currentUser = currentUser.getCurrentUser();
    vm.allAnnouncement = teamformDb.getAllTeamAnnouncement(vm.eventName);

    vm.teams = teamformDb.getAllTeams(vm.eventName);
    vm.members = teamformDb.getAllMembers(vm.eventName);
    vm.searchText = '';
    vm.userSearchText = '';

    vm.displaySkills = displaySkills;
    vm.isMyTeam = isMyTeam;
    vm.isMyEvent = isMyEvent;
    vm.getMemberData = getMemberData;
    vm.doesUserContainsSkills = doesUserContainsSkills;

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

    function doesUserContainsSkills(user, skills) {
      if (!(user && user.skills) || !skills) {
        return false;
      }
      for (var i = 0; i < user.skills.length; i++) {
        var userSkill = user.skills[i];
        if (skills.indexOf(userSkill) > -1) {
          return true;
        }
      }
      return false;
    }
}
