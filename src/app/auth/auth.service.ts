/**
 * AuthService
 * @description - Authorization Service
 * @constructor
 * @param {app.core.firebase.FirebaseFactory} FirebaseFactory - Firebase connections.
 * @param {AngularFireAuthService} $firebaseAuth - AngularFire methods.
 */


module app.auth {

    'use strict';

    export interface IAuthService {

    }

    export class AuthService implements IAuthService {

        static serviceId = 'finApp.auth.AuthService';

        ref: Firebase;
        //inject dependencies
        static $inject = ['$firebaseAuth', 'finApp.core.firebase.FirebaseFactory'];

        constructor(private $firebaseAuth: AngularFireAuthService,
                    private FirebaseFactory: app.core.firebase.FirebaseFactory) {

            this.ref = FirebaseFactory.createFirebase();
            console.log('AuthService service called');
        }

        createAuth(): AngularFireAuth {
            let auth = this.$firebaseAuth(this.ref);
            return auth;
        }


        static instance($firebaseAuth: AngularFireAuthService,
                        FirebaseFactory: app.core.firebase.FirebaseFactory): IAuthService {
            return new AuthService($firebaseAuth, FirebaseFactory);
        }

    }

    angular
        .module('finApp.auth', [])
        .factory(AuthService.serviceId, AuthService.instance);

}
