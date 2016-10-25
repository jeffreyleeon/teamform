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

  describe('MainController', function() {
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

      controller = $controller('MainCtrl', {
        teamformDb: teamformDb,
       });
    });

    it('', function() {
      
    });

    it('', function() {

    });
  });
});