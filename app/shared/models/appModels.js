angular.module('app-models', [])
.factory('modelsFactory', ModelsFactory);

function ModelsFactory() {
	/**
   * Constructor, with class name
   */
  function Event() {
  }

  Event.prototype = {
    get maxTeamSize (){
      return this.fbObject.maxTeamSize;
    },
    set maxTeamSize (val){
      this.fbObject.maxTeamSize = val;
    },
    get minTeamSize (){
      return this.fbObject.minTeamSize;
    },
    set minTeamSize (val){
      this.fbObject.minTeamSize = val;
    },

    setFirebaseObject: function(fbObject) {
      this.fbObject = fbObject;
    },

    loaded: function() {
      return this.fbObject.$loaded();
    },
  }
  /**
   * Return the constructor function
   */
  return {
    Event: Event
  };
}