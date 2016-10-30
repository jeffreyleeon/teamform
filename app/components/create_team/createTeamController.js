angular.module('teamform-team-app', ['teamform-db'])
.controller('CreateTeamCtrl', ['$scope', 'teamformDb', CreateTeamCtrl]);

function CreateTeamCtrl($scope, teamformDb) {
    var vm = this;

    var refPath = "";
    var eventName = getURLParameter("q"); 

    vm.skills = '';  
    
    // TODO: implementation of MemberCtrl   
    vm.param = {
        "teamName" : '',
        "currentTeamSize" : 0,
        "teamMembers" : [],
        "skills": vm.skills,
    };

    teamformDb.getEventAdminData(eventName, function(data) {    
        if ( data.child("param").val() != null ) {
            vm.range = data.child("param").val();
            vm.param.currentTeamSize = parseInt((vm.range.minTeamSize + vm.range.maxTeamSize)/2);
            $scope.$apply(); // force to refresh
            $('#team_page_controller').show(); // show UI
        } 
    });
    
    vm._parseSkills = _parseSkills;
    // vm.requests = [];
    // vm.refreshViewRequestsReceived = refreshViewRequestsReceived;
    vm.changeCurrentTeamSize = changeCurrentTeamSize;
    vm.saveFunc = saveFunc;
    // vm.loadFunc = loadFunc;
    // vm.processRequest = processRequest;
    // vm.removeMember = removeMember;

    // function refreshViewRequestsReceived() {
    //     //vm.test = "";
    //     vm.requests = [];
    //     var teamID = $.trim( vm.param.teamName );   
    //     $.each(vm.member, function(i,obj) {         
    //         //vm.test += i + " " + val;
    //         //vm.test += obj.$id + " " ;
            
    //         var userID = obj.$id;
    //         if ( typeof obj.selection != "undefined"  && obj.selection.indexOf(teamID) > -1 ) {
    //             //vm.test += userID + " " ;
                
    //             vm.requests.push(userID);
    //         }
    //     });
    //     $scope.$apply();
    // }

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
                'size': vm.param.currentTeamSize,
                'teamMembers': vm.param.teamMembers,
                'skills': skills,
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

    // function loadFunc() {
    //     var teamID = $.trim( vm.param.teamName );       
    //     var eventName = getURLParameter("q");

    //     teamformDb.getTeam(eventName, teamID, function(data) {    
    //         if ( data.child("size").val() != null ) {
    //             vm.param.currentTeamSize = data.child("size").val();
    //             vm.refreshViewRequestsReceived();
    //         } 
    //         if ( data.child("teamMembers").val() != null ) {
    //             vm.param.teamMembers = data.child("teamMembers").val();
    //         }
    //         $scope.$apply(); // force to refresh
    //     });
    // }

    // function processRequest(r) {
    //     //vm.test = "processRequest: " + r;
    //     if (vm.param.teamMembers.indexOf(r) < 0 && 
    //         vm.param.teamMembers.length < vm.param.currentTeamSize) {
    //         // Not exists, and the current number of team member is less than the preferred team size
    //         vm.param.teamMembers.push(r);
    //         vm.saveFunc();
    //     }
    // }

    // function removeMember(member) {
    //     var index = vm.param.teamMembers.indexOf(member);
    //     if ( index > -1 ) {
    //         vm.param.teamMembers.splice(index, 1); // remove that item
    //         vm.saveFunc();
    //     }
    // }
}