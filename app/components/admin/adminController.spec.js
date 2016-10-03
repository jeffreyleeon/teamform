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

  describe('AdminController', function() {
    var controller;

    beforeEach(function() {
      var getEvent = function() {
        return {
          '$loaded': function() {
            return new Promise(function(resolve, reject) {
              return resolve();
            });
          },
          '$save': function() {
          },
          maxTeamSize: undefined,
          minTeamSize: undefined,
        };
      };

      var getAllTeams = function(eventName) {
        return {
          'hihi': 'hihi'
        };
      };

      var getAllMembers = function() {};
      var teamformDb = {
        getEvent: getEvent,
        getAllTeams: getAllTeams,
        getAllMembers: getAllMembers,
      };

      controller = $controller('AdminCtrl', {
        teamformDb: teamformDb,
       });
    });

    it('change min team size correctly', function() {
      spyOn(controller.event, '$save');
      controller.event.minTeamSize = 1;
      controller.event.maxTeamSize = 10;
      controller.changeMinTeamSize(1);
      expect(controller.event.$save).toHaveBeenCalled();
      expect(controller.event.minTeamSize).toEqual(2);
      controller.changeMinTeamSize(-4);
      expect(controller.event.$save).toHaveBeenCalled();
      expect(controller.event.minTeamSize).toEqual(2);
      controller.changeMinTeamSize(7);
      expect(controller.event.$save).toHaveBeenCalled();
      expect(controller.event.minTeamSize).toEqual(9);
      controller.changeMinTeamSize(2);
      expect(controller.event.$save).toHaveBeenCalled();
      expect(controller.event.minTeamSize).toEqual(9);
    });

    it('change max team size correctly', function() {
      spyOn(controller.event, '$save');
      controller.event.minTeamSize = 1;
      controller.event.maxTeamSize = 10;
      controller.changeMaxTeamSize(1);
      expect(controller.event.$save).toHaveBeenCalled();
      expect(controller.event.maxTeamSize).toEqual(11);
      controller.changeMaxTeamSize(-4);
      expect(controller.event.$save).toHaveBeenCalled();
      expect(controller.event.maxTeamSize).toEqual(7);
      controller.changeMaxTeamSize(-8);
      expect(controller.event.$save).toHaveBeenCalled();
      expect(controller.event.maxTeamSize).toEqual(7);
    });

    it('save event info', function() {
      spyOn(controller.event, '$save');
      controller.saveFunc();
      expect(controller.event.$save).toHaveBeenCalled();
    });
  });
});