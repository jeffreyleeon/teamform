describe('emailer module', function() {
  beforeEach(module('emailer'));

  var $controller;
  var $http;

  beforeEach(inject(function(_$controller_, _$http_) {
    $controller = _$controller_;
    $http = _$http_;
  }));

  var factory = null;
  beforeEach(inject(function(emailer) {
    factory = emailer;
  }))

  describe('factory: emailer', function() {

    it('Should define methods', function() {
      expect(factory.sendEmailForJoiningEvent).toBeDefined();
      expect(factory.sendEmailForJoiningEvent).toEqual(jasmine.any(Function));
      expect(factory.sendEmail).toBeDefined();
      expect(factory.sendEmail).toEqual(jasmine.any(Function));
      expect(factory.sendEmailForBeingAcceptedByTeam).toBeDefined();
      expect(factory.sendEmailForBeingAcceptedByTeam).toEqual(jasmine.any(Function));

      spyOn(factory, 'sendEmail');
      factory.sendEmailForJoiningEvent('testing@email.com', 'eventName', 'username', 'userEmail');
      expect(factory.sendEmail).toHaveBeenCalledWith(
        'testing@email.com',
        'username' + '(' + 'userEmail' + ') is joining your event ' + 'eventName',
        'Congrats! ' + 'username' + '(' + 'userEmail' + ') is joining your event ' + 'eventName' + '!'
        );

      factory.sendEmailForBeingAcceptedByTeam('testing@email.com', 'eventName', 'teamName');
      expect(factory.sendEmail).toHaveBeenCalledWith(
        'testing@email.com',
        'Congrats! You are accepted by team teamName!',
        'Congrats! You are accepted by team teamName in event eventName!'
        );
    });
  });
});
