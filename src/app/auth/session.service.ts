(function (angular) {

  function sessionService($log, localStorage){

    this._authData = JSON.parse(localStorage.getItem('session.authData'));

    this.getAuthData = function(){
      return this._authData;
    };

    //TODO: esto ya lo esta haciendo por defecto Firebase, analizar si es necesario
    this.setAuthData = function(authData){
      this._authData = authData;
      localStorage.setItem('session.authData', JSON.stringify(authData));
      return this;
    };

    this.getGitHubAccessToken = function(){
      if(this._authData && this._authData.github && this._authData.github.accessToken){
        return this._authData.github.accessToken;
      }
      return null;
    };

    /**
     * Destroy session
     */
    this.destroy = function destroy(){
      this.setAuthData(null);
    };

  }

  // Inject dependencies
  sessionService.$inject = ['$log', 'finApp.localStorageService'];

  // Export
  angular.module('finApp.auth')
    .service('finApp.auth.session', sessionService);

})(angular);
