angular.module('teamform-app')
.controller('CreateTeamCtrl', ['$scope', 'currentUser', 'teamformDb', CreateTeamCtrl]);

function CreateTeamCtrl($scope, currentUser, teamformDb) {
    var vm = this;

    var refPath = "";
    var eventName = getURLParameter("q"); 

    vm.skills = '';
    vm.currentUser = currentUser.getCurrentUser();
    
    vm.param = {
        "teamName" : '',
        "currentTeamSize" : 0,
        "teamMembers" : [],
        "skills": vm.skills,
    };
    vm.range = {};

    teamformDb.getEventAdminData(eventName, function(data) {    
        if ( data.child("param").val() != null ) {
            vm.range = data.child("param").val();
            vm.param.currentTeamSize = parseInt((vm.range.minTeamSize + vm.range.maxTeamSize)/2);
            $scope.$apply(); // force to refresh
            $('#team_page_controller').show(); // show UI
        } 
    });
    
    vm._parseSkills = _parseSkills;
    vm.changeCurrentTeamSize = changeCurrentTeamSize;
    vm.saveFunc = saveFunc;

    function changeCurrentTeamSize(delta) {
        var newVal = vm.param.currentTeamSize + delta;
        if (newVal >= vm.range.minTeamSize && newVal <= vm.range.maxTeamSize ) {
            vm.param.currentTeamSize = newVal;
        } 
    }

    function saveFunc() {
        var teamID = $.trim( vm.param.teamName );
        var skills = _parseSkills(vm.param.skills)
        if ( teamID !== '' ) {
            var newData = {
                'teamName': teamID,
                'size': vm.param.currentTeamSize,
                'teamMembers': vm.param.teamMembers,
                'skills': skills,
                'teamOwner': vm.currentUser.$id || 'dummy',
            };
            var eventName = getURLParameter("q");
            // for each team members, clear the selection in /[eventName]/team/
            $.each(vm.param.teamMembers, function(i,obj){
                //vm.test += obj;
                var rec = vm.member.$getRecord(obj);
                rec.selection = [];
                vm.member.$save(rec);
            });
            teamformDb.setTeamData(eventName, teamID, newData, function(){            
                // console.log("Success..");
                window.history.back();
            });
        }
    }

    function _parseSkills(skills) {
        var arr = skills.split(',');
        for (var i = arr.length - 1; i >= 0; i--) {
            arr[i] = arr[i].replace(/^[ ]+|[ ]+$/g,'');
        }
        return arr;
    }
}