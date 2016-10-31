angular.module('teamform-member-app', ['teamform-db'])
.controller('MemberCtrl', ['teamformDb', MemberCtrl]);

function MemberCtrl(teamformDb) {
    var vm = this;
    // TODO: implementation of MemberCtrl
    
    vm.userID = "";
    vm.userName = "";   
    vm.teams = {};
    
    vm.loadFunc = loadFunc;
    
    vm.saveFunc = saveFunc;
    vm.refreshTeams = refreshTeams;
    vm.refreshTeams(); // call to refresh teams...

    function loadFunc() {
        var userID = vm.userID;
        if ( userID !== '' ) {
            var eventName = getURLParameter("q");
            teamformDb.getMember(eventName, userID, function(data) {
                if ( data.child("name").val() != null ) {
                    vm.userName = data.child("name").val();
                } else {
                    vm.userName = "";
                }
                if (data.child("selection").val() != null ) {
                    vm.selection = data.child("selection").val();
                }
                else {
                    vm.selection = [];
                }
                vm.$apply();
            });
        }
    }

    function saveFunc() {
        var userID = $.trim( vm.userID );
        var userName = $.trim( vm.userName );
        
        if ( userID !== '' && userName !== '' ) {
            var newData = {             
                'name': userName,
                'selection': vm.selection
            };
            var eventName = getURLParameter("q");
            teamformDb.setMemberData(eventName, userID, newData, function(){
                // complete call back
                //alert("data pushed...");
                
                // Finally, go back to the front-end
                window.location.href= "index.html";
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

        var eventName = getURLParameter("q");
        vm.teams = teamformDb.getAllTeams(eventName);
        vm.teams.$loaded()
            .then( function(data) {

            }) 
            .catch(function(error) {
                // Database connection error handling...
                //console.error("Error:", error);
            });
    }    
}