describe('teamform-login-app module', function() {

  beforeEach(module('teamform-login-app'));

  var $controller;

  beforeAll(function() {
    window.onbeforeunload = () => 'Oh no!';
  });

  beforeEach(inject(function(_$controller_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('LoginCtrl', function() {
    var controller;

    beforeEach(function() {
      var loginWithFacebook = function() {
        return {
          'then': function() {},
        };
      };
      var saveNewFBUser = function(
        fbID,
        name,
        email,
        profilePicUrl,
        token,
        refreshToken,
        callback) {
        callback();
      };
      var getUser = function() {
        return {};
      };
      var teamformDb = {
        loginWithFacebook: loginWithFacebook,
        saveNewFBUser: saveNewFBUser,
        getUser: getUser,
      };

      var currentUser = {
        setCurrentUser: function(user) {},
      };

      controller = $controller('LoginCtrl', {
        $scope: {},
        teamformDb: teamformDb,
        currentUser: currentUser,
       });
    });

    it('should initialize with correct default values', function() {
      expect(controller.errorMsg).toEqual('');
    });

    it('should save new facebook user correctly', function() {
      controller.saveNewFBUser({
        uid: 'uid',
        displayName: 'displayName',
        email: 'email',
        photoURL: 'photoURL',
        refreshToken: 'refreshToken'
        },
        'DUMMY TOKEN');
    });

    it('change error message correctly', function() {
      controller.errorMsg = 'before edit';
      controller.setMessage('after edit');
      expect(controller.errorMsg).toEqual('after edit');
    });
  });
});