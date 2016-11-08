describe('teamform-db module', function() {
  beforeEach(module('teamform-db', 'firebase'));

  var $controller;
  var $firebaseObject;
  var $firebaseArray;

  beforeEach(inject(function(_$controller_, _$firebaseObject_, _$firebaseArray_) {
    $controller = _$controller_;
    $firebaseObject = _$firebaseObject_;
    $firebaseArray = _$firebaseArray_;
  }));

  var factory = null;
  beforeEach(inject(function(teamformDb) {
    factory = teamformDb;
  }))

  describe('factory: teamformDb', function() {

    it('Should define methods', function() {
      expect(factory.loginWithFacebook).toBeDefined();
      expect(factory.loginWithFacebook).toEqual(jasmine.any(Function));
      expect(factory.saveNewFBUser).toBeDefined();
      expect(factory.saveNewFBUser).toEqual(jasmine.any(Function));
      expect(factory.getUser).toBeDefined();
      expect(factory.getUser).toEqual(jasmine.any(Function));
      expect(factory.saveNewEvent).toBeDefined();
      expect(factory.saveNewEvent).toEqual(jasmine.any(Function));
      expect(factory.getEvent).toBeDefined();
      expect(factory.getEvent).toEqual(jasmine.any(Function));
      expect(factory.isEventExist).toBeDefined();
      expect(factory.isEventExist).toEqual(jasmine.any(Function));
      expect(factory.getAllEvents).toBeDefined();
      expect(factory.getAllEvents).toEqual(jasmine.any(Function));
      expect(factory.getEventAdminData).toBeDefined();
      expect(factory.getEventAdminData).toEqual(jasmine.any(Function));
      expect(factory.getAllTeams).toBeDefined();
      expect(factory.getAllTeams).toEqual(jasmine.any(Function));
      expect(factory.getTeam).toBeDefined();
      expect(factory.getTeam).toEqual(jasmine.any(Function));
      expect(factory.setTeamData).toBeDefined();
      expect(factory.setTeamData).toEqual(jasmine.any(Function));
      expect(factory.getAllMembers).toBeDefined();
      expect(factory.getAllMembers).toEqual(jasmine.any(Function));
      expect(factory.getMember).toBeDefined();
      expect(factory.getMember).toEqual(jasmine.any(Function));
      expect(factory.setMemberData).toBeDefined();
      expect(factory.setMemberData).toEqual(jasmine.any(Function));
      expect(factory.getAllUsers).toBeDefined();
      expect(factory.getAllUsers).toEqual(jasmine.any(Function));

      spyOn(factory, 'updateFirebase');
      factory.saveNewEvent('testing', null, null);
      expect(factory.updateFirebase).toHaveBeenCalledWith('events/testing/admin/param', null, null);

      // factory.saveNewFBUser('1', '2', '3', '4', '5', '6', null);
      // expect(factory.updateFirebase).toHaveBeenCalledWith('user/1', {             
      //   'fb_id': '1',
      //   'fb_name': '2',
      //   'display_name': '2',
      //   'email': '3',
      //   'profile_pic_url': '4',
      //   'token': '5',
      //   'refresh_token': '6',
      //   'created_at': Date.now() - 1,
      // }, null);

      factory.setTeamData('eventName', 'teamName', null, null);
      expect(factory.updateFirebase).toHaveBeenCalledWith('events/eventName/team/teamName', null, null);

      factory.setMemberData('eventName', 'userID', null, null);
      expect(factory.updateFirebase).toHaveBeenCalledWith('events/eventName/member/userID', null, null);

    });
  });
});
