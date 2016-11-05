angular.module('teamform-team-app', ['teamform-db'])
.controller('TeamCtrl', ['$scope', 'teamformDb', TeamCtrl]);

function TeamCtrl($scope, teamformDb) {
    var vm = this;

    var refPath = "";
    
    // TODO: implementation of MemberCtrl   
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
    vm.getMemberData = getMemberData;

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
            vm.saveFunc();
        }
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
}