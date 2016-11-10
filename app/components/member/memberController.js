angular.module('teamform-app')
.controller('MemberCtrl', ['$scope', 'currentUser', 'teamformDb', MemberCtrl]);

function MemberCtrl($scope, currentUser, teamformDb){
  var vm = this;

  vm.userID = getURLParameter("id");
  vm.user = teamformDb.getUser(vm.userID);


  vm.newSkill = "";
  vm.addNewSkill = addNewSkill;

  function addNewSkill(newSkill){
      if(newSkill != ""){
  	   vm.user.skills.push(newSkill);
       vm.user.$save();
      }
	}

}
