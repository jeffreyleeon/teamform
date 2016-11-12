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

  describe('MemberCtrl', function() {
    var controller;
    var dummyFunc = function() {};

    beforeEach(function() {
      var getUser = function(eventName) {
        return {
          skills: ['skill1'],
          $save: dummyFunc,
        };
      }
      var teamformDb = {
        getUser: getUser,
      };

      var currentUser = {
        getCurrentUser: function() {
          return {
            user: 'user1',
            $id: '123',
          };
        },
      };

      controller = $controller('MemberCtrl', {
        currentUser: currentUser,
        teamformDb: teamformDb,
       });
    });

    it('should initialize with correct default values', function() {
      expect(controller.user).toEqual({
        skills: ['skill1'],
        $save: dummyFunc,
      });
      expect(controller.currentUser).toEqual({
        user: 'user1',
        $id: '123',
      });
      expect(controller.newSkill).toEqual('');
    });

    it('should check if it is my profile correctly', function() {
      controller.userID = '123';
      expect(controller.isMyProfile()).toEqual(true);
      controller.userID = '456';
      expect(controller.isMyProfile()).toEqual(false);
    });

    it('should format skills correctly', function() {
      expect(controller._parseSkills('a, b, c')).toEqual(['a', 'b', 'c']);
      expect(controller._parseSkills('')).toEqual(['']);
    });

    it('should add new skills correctly', function() {
      controller.addNewSkill(null);
      expect(controller.user.skills).toEqual(['skill1']);
      controller.addNewSkill('skill2');
      expect(controller.user.skills).toEqual(['skill1', 'skill2']);
      controller.addNewSkill('skill3, skill4');
      expect(controller.user.skills).toEqual(['skill1', 'skill2', 'skill3', 'skill4']);
      controller.user.skills = null;
      controller.addNewSkill('skill5, skill6');
      expect(controller.user.skills).toEqual(['skill5', 'skill6']);
    });
  });
});