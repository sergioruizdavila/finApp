/**
 * AuthService
 * @description - Authorization Service
 * @function
 * @param {app.core.firebase.FirebaseFactory} FirebaseFactory - Firebase connections.
 * @param {AngularFireAuthService} $firebaseAuth - AngularFire methods.
 */

module app.auth {

    export function AuthService(FirebaseFactory: app.core.firebase.IFirebaseFactory,
        $firebaseAuth: AngularFireAuthService,
        $rootScope: app.interfaces.IFinAppRootScope) {

        var ref = null;

        var service = {

            // Return a Firebase reference
            getRef: function() {
                ref = FirebaseFactory.createFirebase();
                //check Auth Status
                ref.onAuth(this.authDataCallback);
                return $firebaseAuth(ref);
            },

            // Create a callback which logs the current auth state
            authDataCallback: function(authData) {
                if (authData) {
                    console.log('AUTH LOG: User ' + authData.uid + ' is logged in with: ' + authData.provider);
                    // save the user's profile into the database so we can list users,
                    // use them in Security and Firebase Rules, and show profiles
                    //Add provider into User object
                    $rootScope.User.Provider = authData.provider;
                    ref.child('users').child(authData.uid).set($rootScope.User);
                } else {
                    console.log('AUTH LOG: User is logged out');
                }
            },

            // Create a callback to handle the result of the authentication
            authHandler: function (error, authData) {
                if (error) {
                    console.log('Login Failed!', error);
                } else {
                    console.log('Authenticated successfully with payload:', authData);
                }
            }

        };

        return service;

    }

    AuthService.$inject = ['finApp.core.firebase.FirebaseFactory',
                           '$firebaseAuth',
                           '$rootScope'];

    angular
        .module('finApp.auth', [])
        .factory('finApp.auth.AuthService', AuthService);
}
