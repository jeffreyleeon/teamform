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

      controller = $controller('EditEventCtrl', {
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

    it('check if event name exist whenever name changed', function() {
      spyOn(controller, '_checkIfEventExist');
      controller.onEventNameChanged();
      expect(controller._checkIfEventExist).toHaveBeenCalled();
    });
  });
});