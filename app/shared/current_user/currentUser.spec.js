describe('current-user module', function() {

  beforeEach(module('current-user'));

  describe('currentUser', function() {
    var factory = null;

    beforeEach(inject(function(currentUser) {
      factory = currentUser;
    }));

    it('should default as empty', function() {
      expect(factory.getCurrentUser()).toEqual({});
    });

    it('should update user with setter', function() {
      expect(factory.getCurrentUser()).toEqual({});
      factory.setCurrentUser({
        'name': 'tester',
      });
      expect(factory.getCurrentUser()).toEqual({
        'name': 'tester',
      });
    });
  });
});