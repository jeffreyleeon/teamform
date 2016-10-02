angular.module('teamform-admin-app', ['teamform-db', 'firebase'])
.controller('AdminCtrl', ['$firebaseObject', '$firebaseArray', 'teamformDb', AdminCtrl]);

function AdminCtrl($firebaseObject, $firebaseArray, teamformDb) {
    var vm = this;
    // TODO: implementation of AdminCtrl

    // Initialize $scope.param as an empty JSON object
    vm.param = {};
    
    var refPath, ref, eventName;

    eventName = getURLParameter("q");
    refPath = eventName + "/admin/param";   
    ref = firebase.database().ref(refPath);
        
    // Link and sync a firebase object
    vm.param = $firebaseObject(ref);
    vm.param.$loaded()
        .then( function(data) {
            
            // Fill in some initial values when the DB entry doesn't exist          
            if(typeof vm.param.maxTeamSize == "undefined"){             
                vm.param.maxTeamSize = 10;
            }           
            if(typeof vm.param.minTeamSize == "undefined"){             
                vm.param.minTeamSize = 1;
            }
            
            // Enable the UI when the data is successfully loaded and synchornized
            $('#admin_page_controller').show();                 
        }) 
        .catch(function(error) {
            // Database connection error handling...
            //console.error("Error:", error);
        });

    vm.team = teamformDb.getAllTeams(eventName);
    vm.member = teamformDb.getAllMembers(eventName);
    
    vm.changeMinTeamSize = changeMinTeamSize;
    vm.changeMaxTeamSize = changeMaxTeamSize;
    vm.saveFunc = saveFunc;

    function changeMinTeamSize(delta) {
        var newVal = vm.param.minTeamSize + delta;
        if (newVal >=1 && newVal <= vm.param.maxTeamSize ) {
            vm.param.minTeamSize = newVal;
        } 
        vm.param.$save();
    }

    function changeMaxTeamSize(delta) {
        var newVal = vm.param.maxTeamSize + delta;
        if (newVal >=1 && newVal >= vm.param.minTeamSize ) {
            vm.param.maxTeamSize = newVal;
        } 
        vm.param.$save();
    }
    
    function saveFunc() {
        vm.param.$save();
        // Finally, go back to the front-end
        window.location.href= "index.html";
    }
}