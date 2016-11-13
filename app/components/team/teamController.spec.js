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
          $getRecord: function(obj) {
            return {
              selection: [],
            };
          },
          $save: function() {

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

    it('should load team info correctly', function() {
      spyOn(controller, 'refreshViewRequestsReceived');
      controller.team.size = null;
      controller.team.teamMembers = null;
      controller.param.currentTeamSize = 5;
      controller.param.teamMembers = ['Before assign'];
      controller.loadFunc();
      expect(controller.param.currentTeamSize).toEqual(5);
      expect(controller.param.teamMembers).toEqual(['Before assign']);
      controller.team.size = 10;
      controller.team.teamMembers = ['After assign'];
      controller.loadFunc();
      expect(controller.refreshViewRequestsReceived).toHaveBeenCalled();
      expect(controller.param.currentTeamSize).toEqual(10);
      expect(controller.param.teamMembers).toEqual(['After assign']);
    });

    it('should remove member correctly', function() {
      spyOn(controller, 'saveFunc');
      controller.param.teamMembers = [1, 2, 3];
      controller.removeMember(4);
      expect(controller.param.teamMembers).toEqual([1, 2, 3]);
      expect(controller.saveFunc).not.toHaveBeenCalled();
      controller.removeMember(3);
      expect(controller.param.teamMembers).toEqual([1, 2]);
      expect(controller.saveFunc).toHaveBeenCalled();
    });

    it('should process request correctly', function() {
      spyOn(controller, 'saveFunc');
      controller.param.currentTeamSize = 5;
      controller.param.teamMembers = [1, 2, 3, 4, 5];
      controller.processRequest(6);
      expect(controller.param.teamMembers).toEqual([1, 2, 3, 4, 5]);
      expect(controller.saveFunc).not.toHaveBeenCalled();
      controller.param.teamMembers = [1, 2, 3, 4];
      controller.processRequest(1);
      expect(controller.param.teamMembers).toEqual([1, 2, 3, 4]);
      controller.processRequest(6);
      expect(controller.param.teamMembers).toEqual([1, 2, 3, 4, 6]);
      expect(controller.saveFunc).toHaveBeenCalled();
    });

    it('should get member data correctly', function() {
      controller.member = [
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

    it('should save member data correctly', function() {
      controller.team.$save = function() {};
      spyOn(controller.member, '$save');
      spyOn(controller.team, '$save');
      spyOn(controller, 'refreshViewRequestsReceived');
      controller.param.teamMembers = [123];
      controller.param.currentTeamSize = 101;
      controller.param.teamMembers = [101];
      controller.saveFunc();
      expect(controller.member.$save).toHaveBeenCalled();
      expect(controller.team.$save).toHaveBeenCalled();
      expect(controller.refreshViewRequestsReceived).toHaveBeenCalled();
      expect(controller.team.size).toEqual(101);
      expect(controller.team.teamMembers).toEqual([101]);
    });

    it('should check if the member is me correctly', function() {
      expect(controller.isMe('123')).toEqual(true);
      expect(controller.isMe('345')).toEqual(false);
    });
  });
});