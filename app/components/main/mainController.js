angular.module('teamform-app', ['current-user', 'teamform-db'])
.controller('MainCtrl', ['currentUser', 'teamformDb', MainCtrl]);

function MainCtrl(currentUser, teamformDb) {
    var vm = this;
    vm.currentUser = currentUser.getCurrentUser();
    console.log('=======current User ', vm.currentUser);
    vm.email = vm.currentUser.email;

    vm.events = teamformDb.getAllEvents();
}