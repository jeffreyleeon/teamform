angular.module('teamform-app')
.controller('MainCtrl', ['currentUser', 'teamformDb', MainCtrl]);

function MainCtrl(currentUser, teamformDb) {
    var vm = this;

    vm.isLoggedIn = isLoggedIn;
    vm.logout = logout;
    vm.events = teamformDb.getAllEvents();
    
    vm.currentUser = currentUser.getCurrentUser();
    console.log('=======current User ', vm.currentUser);
    vm.email = vm.currentUser.email;

    function isLoggedIn() {
    	if (!vm.currentUser) {
    		return false;
    	}
    	return !angular.equals(vm.currentUser, {});
    }

    function logout() {
    	currentUser.deleteCurrentUser();
    	vm.currentUser = currentUser.getCurrentUser();
    	setTimeout(function() {
            window.location.href= "index.html";
      	}, 100);
    }
}