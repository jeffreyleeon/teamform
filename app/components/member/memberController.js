angular.module('teamform-app')
.controller('MemberCtrl', ['$scope', 'currentUser', 'teamformDb', MemberCtrl]);

function MemberCtrl($scope, currentUser, teamformDb){
  var vm = this;

  vm.userID = getURLParameter("id");
  vm.user = teamformDb.getUser(vm.userID);
  vm.currentUser = currentUser.getCurrentUser();

  vm.newSkill = "";
  vm.addNewSkill = addNewSkill;
  vm.isMyProfile = isMyProfile;

  function addNewSkill(newSkill){
    if(newSkill != ""){
  	  vm.user.skills.push(newSkill);
      vm.user.$save();
    }
	}

  function isMyProfile() {
    return vm.userID === vm.currentUser.$id;
  }

}
