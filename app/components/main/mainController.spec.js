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

      var getAllMembers = function() {};
      var teamformDb = {
        getEvent: getEvent,
      };

      controller = $controller('MainCtrl', {
        teamformDb: teamformDb,
       });
    });
  });
});