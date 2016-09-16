angular.module('teamform-team-app', ['firebase'])
.controller('TeamCtrl', ['$scope', '$firebaseObject', '$firebaseArray', TeamCtrl]);

function TeamCtrl($scope, $firebaseObject, $firebaseArray) {
    var vm = this;
    // Call Firebase initialization code defined in site.js
    initalizeFirebase();

    var refPath = "";
    var eventName = getURLParameter("q");   
    
    // TODO: implementation of MemberCtrl   
    vm.param = {
        "teamName" : '',
        "currentTeamSize" : 0,
        "teamMembers" : []
    };

    refPath =  eventName + "/admin";
    retrieveOnceFirebase(firebase, refPath, function(data) {    
        if ( data.child("param").val() != null ) {
            vm.range = data.child("param").val();
            vm.param.currentTeamSize = parseInt((vm.range.minTeamSize + vm.range.maxTeamSize)/2);
            $scope.$apply(); // force to refresh
            $('#team_page_controller').show(); // show UI
        } 
    });
    
    
    refPath = eventName + "/member";    
    vm.member = [];
    vm.member = $firebaseArray(firebase.database().ref(refPath));
    
    refPath = eventName + "/team";  
    vm.team = [];
    vm.team = $firebaseArray(firebase.database().ref(refPath));
    
    
    vm.requests = [];
    vm.refreshViewRequestsReceived = refreshViewRequestsReceived;
    vm.changeCurrentTeamSize = changeCurrentTeamSize;
    vm.saveFunc = saveFunc;
    vm.loadFunc = loadFunc;
    vm.processRequest = processRequest;
    vm.removeMember = removeMember;

    function refreshViewRequestsReceived() {
        //vm.test = "";
        vm.requests = [];
        var teamID = $.trim( vm.param.teamName );   
        $.each(vm.member, function(i,obj) {         
            //vm.test += i + " " + val;
            //vm.test += obj.$id + " " ;
            
            var userID = obj.$id;
            if ( typeof obj.selection != "undefined"  && obj.selection.indexOf(teamID) > -1 ) {
                //vm.test += userID + " " ;
                
                vm.requests.push(userID);
            }
        });
        $scope.$apply();
    }

    function changeCurrentTeamSize(delta) {
        var newVal = vm.param.currentTeamSize + delta;
        if (newVal >= vm.range.minTeamSize && newVal <= vm.range.maxTeamSize ) {
            vm.param.currentTeamSize = newVal;
        } 
    }

    function saveFunc() {
        var teamID = $.trim( vm.param.teamName );
        if ( teamID !== '' ) {
            var newData = {             
                'size': vm.param.currentTeamSize,
                'teamMembers': vm.param.teamMembers
            };      
            var refPath = getURLParameter("q") + "/team/" + teamID; 
            var ref = firebase.database().ref(refPath);
            // for each team members, clear the selection in /[eventName]/team/
            
            $.each(vm.param.teamMembers, function(i,obj){
                //vm.test += obj;
                var rec = vm.member.$getRecord(obj);
                rec.selection = [];
                vm.member.$save(rec);
            });
            ref.set(newData, function(){            
                // console.log("Success..");
                // Finally, go back to the front-end
                // window.location.href= "index.html";
            });
        }
    }

    function loadFunc() {
        var teamID = $.trim( vm.param.teamName );       
        var eventName = getURLParameter("q");
        var refPath = eventName + "/team/" + teamID ;
        retrieveOnceFirebase(firebase, refPath, function(data) {    
            if ( data.child("size").val() != null ) {
                vm.param.currentTeamSize = data.child("size").val();
                vm.refreshViewRequestsReceived();
            } 
            if ( data.child("teamMembers").val() != null ) {
                vm.param.teamMembers = data.child("teamMembers").val();
            }
            $scope.$apply(); // force to refresh
        });
    }

    function processRequest(r) {
        //vm.test = "processRequest: " + r;
        if (vm.param.teamMembers.indexOf(r) < 0 && 
            vm.param.teamMembers.length < vm.param.currentTeamSize) {
            // Not exists, and the current number of team member is less than the preferred team size
            vm.param.teamMembers.push(r);
            vm.saveFunc();
        }
    }

    function removeMember(member) {
        var index = vm.param.teamMembers.indexOf(member);
        if ( index > -1 ) {
            vm.param.teamMembers.splice(index, 1); // remove that item
            vm.saveFunc();
        }
    }
}