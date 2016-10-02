angular.module('app-models')
.factory('Event', EventFactory);

function EventFactory() {
	/**
   * Constructor, with class name
   */
  function Event() {
    // Public properties, assigned to the instance ('this')
    // this.firstName = firstName;
    // this.lastName = lastName;
    // this.role = role;
    // this.organisation = organisation;
    console.log('====event constructor');
  }
 
  /**
   * Public method, assigned to prototype
   */
  Event.prototype.getFullName = function () {
    return 'FULL NAME';
  };
 
  /**
   * Private property
   */
  // var possibleRoles = ['admin', 'editor', 'guest'];
 
  /**
   * Private function
   */
  function checkRole(role) {
    return '====ROLE CHECKED ' + role;
  }
 
  /**
   * Return the constructor function
   */
  return Event;
}