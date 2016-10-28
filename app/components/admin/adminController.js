angular.module('teamform-admin-app')
.controller('AdminCtrl', ['teamformDb', AdminCtrl]);

function AdminCtrl(teamformDb) {
    var vm = this;
    // TODO: implementation of AdminCtrl
    var eventName = getURLParameter("q");
    vm.event = teamformDb.getEvent(eventName);
    vm.event.$loaded()
        .then(function(data) {
            // Enable the UI when the data is successfully loaded and synchornized
            vm.event.maxTeamSize |= 10;
            vm.event.minTeamSize |= 1;
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
        var newVal = vm.event.minTeamSize + delta;
        if (newVal >=1 && newVal <= vm.event.maxTeamSize ) {
            vm.event.minTeamSize = newVal;
        } 
        vm.event.$save();
    }

    function changeMaxTeamSize(delta) {
        var newVal = vm.event.maxTeamSize + delta;
        if (newVal >=1 && newVal >= vm.event.minTeamSize ) {
            vm.event.maxTeamSize = newVal;
        } 
        vm.event.$save();
    }
    
    function saveFunc() {
        vm.event.$save();
        // Finally, go back to the front-end
        window.location.href= "index.html";
    }
}