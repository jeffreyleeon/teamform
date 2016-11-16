angular.module('teamform-admin-app')
.controller('EditEventCtrl', ['currentUser', 'teamformDb', EditEventCtrl]);

function EditEventCtrl(currentUser, teamformDb) {
    var vm = this;

    vm.eventName = getURLParameter("q");
    vm.event = teamformDb.getEvent(vm.eventName);
    vm.currentUser = currentUser.getCurrentUser();
    vm.announcementUrgency = false;
    vm.announcementContent = "";
    vm.allAnnouncement = teamformDb.getAllTeamAnnouncement(vm.eventName);

    vm.changeMinTeamSize = changeMinTeamSize;
    vm.changeMaxTeamSize = changeMaxTeamSize;
    vm.addNewAnnouncement = addNewAnnouncement;
    vm.deleteAnnouncement = deleteAnnouncement;
    vm.changeNumOfTeamLeaders = changeNumOfTeamLeaders;
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

    function addNewAnnouncement(){
        teamformDb.addTeamAnnouncement(vm.eventName,vm.announcementUrgency,vm.announcementContent);
    }

    function deleteAnnouncement(announcementId){
        teamformDb.deleteTeamAnnouncement(vm.eventName,announcementId);
    }

    function changeNumOfTeamLeaders(delta) {
      var newVal = vm.event.numberOfLeaders + delta;
      if (newVal >= 1 && newVal <= vm.event.maxTeamSize) {
        vm.event.numberOfLeaders = newVal;
      }
    }

    function saveFunc() {
        vm.event.$save();
        if(vm.announcementContent !== ""){
            vm.addNewAnnouncement();
        }        
        setTimeout(function() {
            window.history.back();
        }, 100);
    }
}
