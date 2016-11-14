angular.module('teamform-app')
.controller('MemberCtrl', ['currentUser', 'teamformDb', MemberCtrl]);

function MemberCtrl(currentUser, teamformDb){
  var vm = this;

  vm.userID = getURLParameter("id");
  vm.user = teamformDb.getUser(vm.userID);
  vm.currentUser = currentUser.getCurrentUser();

  vm.newSkill = "";
  vm.addNewSkill = addNewSkill;
  vm.saveChanges = vm.saveChanges;
  vm.updateCurrentUser = updateCurrentUser;
  vm.isMyProfile = isMyProfile;
  vm._parseSkills = _parseSkills;

  function addNewSkill(newSkill) {
    if (!newSkill) {
      return;
    }
    var arr = _parseSkills(newSkill);
    if (!!vm.user.skills) {
      vm.user.skills = vm.user.skills.concat(arr);
    } else {
      vm.user.skills = arr;
    }
    vm.newSkill = '';
    saveChanges();
	}

  function saveChanges() {
    vm.user.$save().then(function() {
      vm.updateCurrentUser();
    });
  }

  function updateCurrentUser() {
    var savedUser = teamformDb.getUser(vm.userID);
    currentUser.setCurrentUser(savedUser);
  }

  function isMyProfile() {
    return vm.userID === vm.currentUser.$id;
  }

  function _parseSkills(skills) {
    var arr = skills.split(',');
    for (var i = arr.length - 1; i >= 0; i--) {
        arr[i] = arr[i].replace(/^[ ]+|[ ]+$/g,'');
    }
    return arr;
  }
}
