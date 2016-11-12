angular.module('emailer', [])
.factory('emailer', ['$http', Emailer]);

function Emailer($http) {

  var service = {
    sendEmailForJoiningEvent: sendEmailForJoiningEvent,
    sendEmail: sendEmail,
  };
  return service;

  function sendEmailForJoiningEvent(eventOwnerEmail, eventName, username, userEmail) {
    var subject = username + '(' + userEmail + ') is joining your event ' + eventName;
    var text = 'Congrats! ' + username + '(' + userEmail + ') is joining your event ' + eventName + '!';
    return service.sendEmail(eventOwnerEmail, subject, text);
  }

  function sendEmail(email, subject, text) {
    console.log('=======sending email to ', email);
    return $http.post(
      'https://software-engineering-server.herokuapp.com/',
      {
          email: email,
          subject: subject,
          text: text,
      }
    );
  }
}
