(function (angular) {
//TODO: Unificar esto con el auth.service que ya tenemos
  function AuthService($q, $firebaseAuth, session){

    var ref = new Firebase('https://shining-fire-8072.firebaseio.com');
    var authObj = $firebaseAuth(ref);

    this.isLoggedIn = function isLoggedIn(){
      return session.getAuthData() !== null;
    };

    this.logInGitHug = function(){
      return authObj
        .$authWithOAuthPopup('github', {
          scope: 'user'
        })
        .then(
          function(authData){
            session.setAuthData(authData);
            return authData;
          },
          function(error){
            $q.reject(error);
          }
        );
    };

    this.logInPassword = function(currentDataUser) {
        return authObj
        .$authWithPassword(currentDataUser)
        .then(
          function(authData){
            session.setAuthData(authData);
            return authData;
          },
          function(error){
            $q.reject(error);
          }
        );
    };

    this.logOut = function(){
      authObj.unauth();
      session.destroy();
    };

  }

  // Inject dependencies
  AuthService.$inject = ['$q', '$firebaseAuth', 'finApp.auth.session'];

  // Export
  angular.module('finApp.authExample', [])
    .service('finApp.auth.AuthServiceExample', AuthService);

})(angular);
