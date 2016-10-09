angular.module('teamform-app', ['current-user'])
.controller('MainCtrl', ['currentUser', MainCtrl]);

function MainCtrl(currentUser) {
    var vm = this;
    vm.currentUser = currentUser.getCurrentUser();
    console.log('=======current User ', vm.currentUser);
    vm.email = vm.currentUser.email;
}