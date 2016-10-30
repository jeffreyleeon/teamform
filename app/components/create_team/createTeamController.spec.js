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

  describe('CreateTeamCtrl', function() {
    var controller;

    beforeEach(function() {
      var getEventAdminData = function(eventName, callback) {
        callback({
          child: function() {
            return {
              val: function() {
                return {
                  minTeamSize: 2,
                  maxTeamSize: 10,
                };
              }
            }
          }
        });
      };
      var teamformDb = {
        getEventAdminData: getEventAdminData,
      };

      var currentUser = {
        getCurrentUser: function() {
          return {
            user: 'user1',
            $id: '123',
          };
        },
      };

      controller = $controller('CreateTeamCtrl', {
        $scope: {
          $apply: function() {},
        },
        currentUser: currentUser,
        teamformDb: teamformDb,
       });
    });

    it('should initialize with correct default values', function() {
      expect(controller.skills).toEqual('');
      expect(controller.currentUser).toEqual({
        user: 'user1',
        $id: '123',
      });
      expect(controller.param).toEqual({
        "teamName" : '',
        "currentTeamSize" : 6,
        "teamMembers" : [],
        "skills": '',
      });
    });

    it('change team size correctly', function() {
      controller.param.currentTeamSize = 5;
      controller.range.minTeamSize = 1;
      controller.range.maxTeamSize = 10;
      controller.changeCurrentTeamSize(1);
      expect(controller.param.currentTeamSize).toEqual(6);
      controller.changeCurrentTeamSize(-3);
      expect(controller.param.currentTeamSize).toEqual(3);
      controller.changeCurrentTeamSize(-4);
      expect(controller.param.currentTeamSize).toEqual(3);
      controller.changeCurrentTeamSize(10);
      expect(controller.param.currentTeamSize).toEqual(3);
    });

    it('should format skills correctly', function() {
      expect(controller._parseSkills('a, b, c')).toEqual(['a', 'b', 'c']);
      expect(controller._parseSkills('')).toEqual(['']);
    });
  });
});