angular.module('teamform-admin-app')
.controller('CreateEventCtrl', ['teamformDb', CreateEventCtrl]);

function CreateEventCtrl(teamformDb) {
    var vm = this;

    vm.eventName = '';
    vm.event = {
        maxTeamSize: 10,
        minTeamSize: 1,
    };
    
    vm.changeMinTeamSize = changeMinTeamSize;
    vm.changeMaxTeamSize = changeMaxTeamSize;
    vm.saveFunc = saveFunc;

    function changeMinTeamSize(delta) {
        var newVal = vm.event.minTeamSize + delta;
        if (newVal >=1 && newVal <= vm.event.maxTeamSize ) {
            vm.event.minTeamSize = newVal;
        }
    }

    function changeMaxTeamSize(delta) {
        var newVal = vm.event.maxTeamSize + delta;
        if (newVal >=1 && newVal >= vm.event.minTeamSize ) {
            vm.event.maxTeamSize = newVal;
        }
    }
    
    function saveFunc() {
        // vm.event.$save();
        // Finally, go back to the front-end
        // window.location.href= "index.html";
        console.log('=======save ', vm.eventName, vm.event);
    }
}