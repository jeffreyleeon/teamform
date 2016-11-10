angular.module('teamform-admin-app')
.controller('EditEventCtrl', ['currentUser', 'teamformDb', EditEventCtrl]);

function EditEventCtrl(currentUser, teamformDb) {
    var vm = this;

    vm.eventName = getURLParameter("q");
    vm.event = teamformDb.getEvent(vm.eventName);
    vm.currentUser = currentUser.getCurrentUser();

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
        vm.event.$save();
        setTimeout(function() {
            window.history.back();
        }, 100);
    }
}
