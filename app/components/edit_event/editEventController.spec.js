describe('teamform-admin-app module', function() {

  beforeEach(module('teamform-admin-app'));

  var $controller;

  beforeAll(function() {
    window.onbeforeunload = () => 'Oh no!';
  });

  beforeEach(inject(function(_$controller_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('EditEventCtrl', function() {
    var controller;

    beforeEach(function() {
      var getEvent = function(eventName) {
        return {
          event: 'event1',
        };
      }
      var saveNewEvent = function() {};
      var getAllTeamAnnouncement = function() {
        return [];
      }
      var addTeamAnnouncement = function() {};
      var deleteTeamAnnouncement = function() {};
      var teamformDb = {
        getEvent: getEvent,
        saveNewEvent: saveNewEvent,
        getAllTeamAnnouncement: getAllTeamAnnouncement,
        addTeamAnnouncement: addTeamAnnouncement,
        deleteTeamAnnouncement: deleteTeamAnnouncement,
      };

      var currentUser = {
        getCurrentUser: function() {
          return {
            user: 'user1',
            $id: '123',
          };
        },
      };

      controller = $controller('EditEventCtrl', {
        currentUser: currentUser,
        teamformDb: teamformDb,
       });
    });

    it('should initialize with correct default values', function() {
      expect(controller.event).toEqual({
        event: 'event1',
      });
      expect(controller.currentUser).toEqual({
        user: 'user1',
        $id: '123',
      });
    });

    it('change min team size correctly', function() {
      controller.event.minTeamSize = 1;
      controller.event.maxTeamSize = 10;
      controller.changeMinTeamSize(1);
      expect(controller.event.minTeamSize).toEqual(2);
      controller.changeMinTeamSize(-4);
      expect(controller.event.minTeamSize).toEqual(2);
      controller.changeMinTeamSize(7);
      expect(controller.event.minTeamSize).toEqual(9);
      controller.changeMinTeamSize(2);
      expect(controller.event.minTeamSize).toEqual(9);
    });

    it('change max team size correctly', function() {
      controller.event.minTeamSize = 1;
      controller.event.maxTeamSize = 10;
      controller.changeMaxTeamSize(1);
      expect(controller.event.maxTeamSize).toEqual(11);
      controller.changeMaxTeamSize(-4);
      expect(controller.event.maxTeamSize).toEqual(7);
      controller.changeMaxTeamSize(-8);
      expect(controller.event.maxTeamSize).toEqual(7);
    });

    it('change number of team leader correctly', function() {
      controller.event.minTeamSize = 1;
      controller.event.maxTeamSize = 10;
      controller.event.numberOfLeaders = 1;
      controller.changeNumOfTeamLeaders(-1);
      expect(controller.event.numberOfLeaders).toEqual(1);
      controller.changeNumOfTeamLeaders(2);
      expect(controller.event.numberOfLeaders).toEqual(3);
      controller.changeNumOfTeamLeaders(10);
      expect(controller.event.numberOfLeaders).toEqual(3);
      controller.changeNumOfTeamLeaders(7);
      expect(controller.event.numberOfLeaders).toEqual(10);
    });

    it('should add and remove event announcement correctly', function() {
      controller.addNewAnnouncement();
      controller.deleteAnnouncement();
    });
  });
});