describe('teamform-app module', function() {

  beforeEach(module('teamform-app'));

  var $controller;

  beforeAll(function() {
    window.onbeforeunload = () => 'Oh no!';
  });

  beforeEach(inject(function(_$controller_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('ShowEventCtrl', function() {
    var controller;

    beforeEach(function() {
      var isEventExist = function(eventName) { 
        return {
          'then': function() {},
        };
      };
      var getEvent = function(eventName) {
        return {
          event: 'event1',
        };
      }
      var getAllTeams = function(eventName) {
        return {
          teams: 'team1'
        };
      };
      var getAllMembers = function(eventName) {
        return {
          members: 'member1'
        };
      };
      var saveNewEvent = function() {};
      var teamformDb = {
        isEventExist: isEventExist,
        getEvent: getEvent,
        getAllTeams: getAllTeams,
        getAllMembers: getAllMembers,
        saveNewEvent: saveNewEvent,
      };

      var currentUser = {
        getCurrentUser: function() {
          return {
            user: 'user1',
            $id: '123',
          };
        },
      };

      controller = $controller('ShowEventCtrl', {
        $scope: {},
        currentUser: currentUser,
        teamformDb: teamformDb,
       });
    });

    it('should initialize with correct default values', function() {
      expect(controller.eventName).toEqual(null);
      expect(controller.event).toEqual({
        event: 'event1',
      });
      expect(controller.currentUser).toEqual({
        user: 'user1',
        $id: '123',
      });
      expect(controller.teams).toEqual({
        teams: 'team1'
      });
      expect(controller.members).toEqual({
        members: 'member1'
      });
    });

    it('should format team required skills correctly', function() {
      expect(controller.displaySkills(null)).toEqual('');
      expect(controller.displaySkills(['a', 'b', 'c'])).toEqual('a, b, c');
    });

    it('should check if the team is my team correctly', function() {
      expect(controller.isMyTeam({
        teamOwner: '123'
      })).toEqual(true);
      expect(controller.isMyTeam({
        teamOwner: '234'
      })).toEqual(false);
    });

    it('should check if the event is my event correctly', function() {
      expect(controller.isMyEvent({
        eventOwner: '123'
      })).toEqual(true);
      expect(controller.isMyEvent({
        eventOwner: '234'
      })).toEqual(false);
    });

    it('should get member data correctly', function() {
      controller.members = [
        {
          $id: 123,
          name: 'Name123',
          introduction: 'Intro123',
          skills: ['123', 's123', 'ss123'],
        },
        {
          $id: 456,
          name: 'Name456',
          introduction: 'Intro456',
          skills: ['456', 's456', 'ss456'],
        },
      ];
      expect(controller.getMemberData(123)).toEqual({
        name: 'Name123',
        introduction: 'Intro123',
        skills: ['123', 's123', 'ss123'],
      });
      expect(controller.getMemberData(789)).toEqual({
        name: '',
        introduction: '',
        skills: [],
      });
    });
  });
});