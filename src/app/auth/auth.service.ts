/**
 * AuthService
 * @description - Authorization Service
 * @function
 * @param {app.core.firebase.FirebaseFactory} FirebaseFactory - Firebase connections.
 * @param {AngularFireAuthService} $firebaseAuth - AngularFire methods.
 */

module app.auth {

    export function AuthService(FirebaseFactory: app.core.firebase.IFirebaseFactory,
        $firebaseAuth: AngularFireAuthService) {

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
                    ref.child('users').child(authData.uid).set({
                        provider: authData.provider,
                        email: authData.password.email
                    });
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

        // return function() {
        //
        //     function getRef() {
        //         this.ref = FirebaseFactory.createFirebase();
        //         //check Auth Status
        //         this.ref.onAuth(authDataCallback);
        //         return $firebaseAuth(this.ref);
        //     }
        //
        //     // Create a callback which logs the current auth state
        //     function authDataCallback(authData) {
        //         if (authData) {
        //             console.log('AUTH LOG: User ' + authData.uid + ' is logged in with: ' + authData.provider);
        //         } else {
        //             console.log('AUTH LOG: User is logged out');
        //         }
        //     }
        //
        //     // Create a callback to handle the result of the authentication
        //     function authHandler(error, authData) {
        //         if (error) {
        //             console.log('Login Failed!', error);
        //         } else {
        //             console.log('Authenticated successfully with payload:', authData);
        //         }
        //     }
        //
        // };

    }

    AuthService.$inject = ['finApp.core.firebase.FirebaseFactory', '$firebaseAuth'];

    angular
        .module('finApp.auth', [])
        .factory('finApp.auth.AuthService', AuthService);
}
