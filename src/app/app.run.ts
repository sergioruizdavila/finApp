/**
 * run() run low-level functionality
 * such as authorization, get user info, roles, etc.
 *
 * @param {scope} $rootScope
 * @param {ICurrentUser} currentUser
 * @return {void}
 */


(function(): void {

    'use strict';

    angular
        .module('finApp')
        .run(run);

    run.$inject = ['$ionicPlatform',
                   '$rootScope',
                   'finApp.auth.AuthServiceExample',
                   'finApp.auth.session',
                   '$state'];

    function run($ionicPlatform, $rootScope: app.interfaces.IFinAppRootScope, auth, session, $state): void {

        $ionicPlatform.ready(function() {

            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

        });

        $rootScope.auth = auth;
        $rootScope.session = session;

        //Create User object
        $rootScope.User = new app.models.user.UserFirebase();
    }

})();


(function (angular) {

  function localStorageServiceFactory($window){
    if($window.localStorage){
      return $window.localStorage;
    }
    throw new Error('Local storage support is needed');
  }

  // Inject dependencies
  localStorageServiceFactory.$inject = ['$window'];

  // Export
  angular
    .module('finApp.localStorage', [])
    .factory('finApp.localStorageService', localStorageServiceFactory);

})(angular);
