/**
 * AuthService
 * @description - Authorization Service
 * @function
 * @param {app.core.firebase.FirebaseFactory} FirebaseFactory - Firebase connections.
 * @param {AngularFireAuthService} $firebaseAuth - AngularFire methods.
 */

module app.auth {

    export function AuthService (FirebaseFactory: app.core.firebase.IFirebaseFactory,
                                $firebaseAuth: AngularFireAuthService) {

        return function () {
            this.ref = FirebaseFactory.createFirebase();
            return $firebaseAuth(this.ref);
        };
    }

    AuthService.$inject = ['finApp.core.firebase.FirebaseFactory', '$firebaseAuth'];

    angular
        .module('finApp.auth', [])
        .factory('finApp.auth.AuthService', AuthService);
}
