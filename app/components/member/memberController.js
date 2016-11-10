angular.module('teamform-app')
.controller('MemberCtrl', ['$scope', 'currentUser', 'teamformDb', MemberCtrl]);

function MemberCtrl($scope, currentUser, teamformDb){
  var vm = this;

  vm.userID = getURLParameter("id");
  vm.user = teamformDb.getUser(vm.userID);

  vm.user.skills = ["skill1", "skill2", "skill3"];


}
