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

  describe('CreateEventCtrl', function() {
    var controller;

    beforeEach(function() {
      var isEventExist = function(eventName) { 
        return {
          'then': function() {},
        };
      };
      var saveNewEvent = function() {};
      var teamformDb = {
        isEventExist: isEventExist,
        saveNewEvent: saveNewEvent,
      };

      controller = $controller('CreateEventCtrl', {
        $scope: {},
        teamformDb: teamformDb,
       });
    });

    it('should initialize with correct default values', function() {
      expect(controller.eventName).toEqual('');
      expect(controller.eventNameError).toEqual('');
      expect(controller.eventValid).toEqual(false);
      expect(controller.event.minTeamSize).toEqual(1);
      expect(controller.event.maxTeamSize).toEqual(10);
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

    it('check if event name exist whenever name changed', function() {
      spyOn(controller, '_checkIfEventExist');
      controller.onEventNameChanged();
      expect(controller._checkIfEventExist).toHaveBeenCalled();
    });
  });
});