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

  describe('TeamCtrl', function() {
    var controller;

    beforeEach(function() {
      var getEvent = function(eventName) {
        return {
          event: 'event1',
        };
      }
      var getTeam = function(eventName, teamName) {
        return {
          size: 5,
          skills: ['C++', 'Java', 'C'],
          teamMembers: ['456', '789'],
          teamOwner: '123',
        };
      };
      var getAllMembers = function(eventName) {
        return {
          $loaded: function() {
            return new Promise(
              function(resolve, reject) {
              }
            );
          },
        };
      };
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
      }
      var teamformDb = {
        getEvent: getEvent,
        getTeam: getTeam,
        getAllMembers: getAllMembers,
        getEventAdminData: getEventAdminData,
      };

      var currentUser = {
        getCurrentUser: function() {
          return {
            user: 'user1',
            $id: '123',
          };
        },
        isLoggedIn: function() {
          return true;
        },
      };

      controller = $controller('TeamCtrl', {
        $scope: {
          $apply: function() {},
        },
        currentUser: currentUser,
        teamformDb: teamformDb,
       });
    });

    it('should initialize with correct default values', function() {
      expect(controller.param.teamMembers).toEqual([]);
      expect(controller.param.currentTeamSize).toEqual(6);
      expect(controller.requests).toEqual([]);
      expect(controller.currentUser).toEqual({
        user: 'user1',
        $id: '123',
      });
      expect(controller.team).toEqual({
        size: 5,
        skills: ['C++', 'Java', 'C'],
        teamMembers: ['456', '789'],
        teamOwner: '123',
      });
    });

    it('should check if a user is logged in or not correctly', function() {
      expect(controller.isLoggedIn()).toEqual(true);
    });

    it('should check if a user contains required skills correctly', function() {
      expect(controller.containsRequiredSkills()).toEqual(false);
      expect(controller.containsRequiredSkills(null)).toEqual(false);
      expect(controller.containsRequiredSkills(1)).toEqual(false);
      controller.team.skills = ['aaa', 'bbb', 'ccc'];
      expect(controller.containsRequiredSkills(['C++', 'Java', 'C#'])).toEqual(false);
      expect(controller.containsRequiredSkills(['C++', 'Java', 'aaa'])).toEqual(true);
    });

    it('should check if user is team leader correctly', function() {
      expect(controller.isTeamLeader()).toEqual(true);
      controller.isLoggedIn = function() {
        return false;
      }
      expect(controller.isTeamLeader()).toEqual(false);
    });

    it('should refresh requests received correctly', function() {
      controller.param.teamName = 'teamName';
      controller.member = [
        {
          $id: 'member1',
          selection: undefined,
        },
        {
          $id: 'member2',
          selection: ['teamName'],
        },
        {
          $id: 'member3',
          selection: ['teamName not exist'],
        },
      ];
      controller.refreshViewRequestsReceived();
      expect(controller.requests).toEqual(['member2']);
    });
  });
});