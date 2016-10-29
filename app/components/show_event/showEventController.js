angular.module('teamform-app')
.controller('ShowEventCtrl', ['$scope', 'currentUser', 'teamformDb', ShowEventCtrl]);

function ShowEventCtrl($scope, currentUser, teamformDb) {
    var vm = this;

    vm.eventName = getURLParameter("id");
    vm.event = teamformDb.getEvent(vm.eventName);
    vm.currentUser = currentUser.getCurrentUser();

    vm.teams = teamformDb.getAllTeams(vm.eventName);
    vm.members = teamformDb.getAllMembers(vm.eventName);
}