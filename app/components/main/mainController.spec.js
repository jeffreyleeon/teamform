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

  describe('MainCtrl', function() {
    var controller;
    var _loggedIn;

    beforeEach(function() {
      var getAllEvents = function() {
        return [{
          event: 'event1',
        }];
      }
      var getAllUsers = function() {
        return [
          {
            user: 'user1',
            $id: '123',
            email: 'myemail@gmail.com',
          }
        ];
      };
      var teamformDb = {
        getAllEvents: getAllEvents,
        getAllUsers: getAllUsers,
      };

      _loggedIn = true;
      var currentUser = {
        getCurrentUser: function() {
          if (!_loggedIn) {
            return {};
          }
          return {
            user: 'user1',
            $id: '123',
            email: 'myemail@gmail.com',
          };
        },
        deleteCurrentUser: function() {
          _loggedIn = false;
        },
        isLoggedIn: function() {
          return _loggedIn;
        },
      };

      controller = $controller('MainCtrl', {
        currentUser: currentUser,
        teamformDb: teamformDb,
       });
    });

    it('should initialize with correct default values', function() {
      expect(controller.events).toEqual([{
        event: 'event1',
      }]);
      expect(controller.currentUser).toEqual({
        user: 'user1',
        $id: '123',
        email: 'myemail@gmail.com',
      });
      expect(controller.email).toEqual('myemail@gmail.com');
      expect(controller.users).toEqual([
        {
          user: 'user1',
          $id: '123',
          email: 'myemail@gmail.com',
        }
      ]);
    });

    it('should logout correctly', function() {
      expect(controller.currentUser).toEqual({
        user: 'user1',
        $id: '123',
        email: 'myemail@gmail.com',
      });
      controller.logout();
      expect(controller.currentUser).toEqual({});
    });

    it('should check whether a user is logged in or not correctly', function() {
      expect(controller.currentUser).toEqual({
        user: 'user1',
        $id: '123',
        email: 'myemail@gmail.com',
      });
      expect(controller.isLoggedIn()).toEqual(true);
      controller.logout();
      expect(controller.currentUser).toEqual({});
      expect(controller.isLoggedIn()).toEqual(false);
    });
  });
});