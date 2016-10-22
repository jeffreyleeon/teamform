describe('current-user module', function() {

  var currentUser;
  beforeEach(module('current-user'));

  beforeEach(inject(function(_currentUser_) {
    currentUser = _currentUser_;
  }));

  describe('currentUser', function() {
    it("should be a resource", function() {
      expect(currentUser).toBeDefined();
    });

    it('should default as empty', function() {
      expect(currentUser.getCurrentUser()).toEqual({});
    });

    it('should update user with setter', function() {
      expect(currentUser.getCurrentUser()).toEqual({});
      currentUser.setCurrentUser({
        'name': 'tester',
      });
      expect(currentUser.getCurrentUser()).toEqual({
        'name': 'tester',
      });
    });
  });
});