/**
 * AuthService
 * @description - Authorization Service
 * @function
 * @param {app.core.firebase.FirebaseFactory} FirebaseFactory - Firebase connections.
 * @param {AngularFireAuthService} $firebaseAuth - AngularFire methods.
 */

module app.auth {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IAuthService {
        getRef: () => AngularFireAuth;
        getUserAuthData: () => FirebaseAuthData;
        isLoggedIn: () => boolean;
        logInPassword: (currentDataUser: app.interfaces.IUserDataAuth) => angular.IPromise<FirebaseAuthData>;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class AuthService implements IAuthService {

        static serviceId = 'finApp.auth.AuthService';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        private _ref: Firebase = null;
        private _authObj: AngularFireAuth = this.getRef();
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['finApp.core.firebase.FirebaseFactory',
                          '$firebaseAuth',
                          'finApp.auth.SessionService',
                          '$q',
                          '$rootScope'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private FirebaseFactory: app.core.firebase.IFirebaseFactory,
                    private $firebaseAuth: AngularFireAuthService,
                    private session: ISessionService,
                    private $q: any,
                    $rootScope: app.interfaces.IFinAppRootScope) {
            console.log('auth service called');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * getRef
        * @description - Return a Firebase Auth reference
        * @function
        * @return {AngularFireAuth} $firebaseAuth - firebase auth reference
        */
        getRef(): AngularFireAuth {
            this._ref = this.FirebaseFactory.createFirebase();
            //check Auth Status
            this._ref.onAuth(this._authDataCallback);
            return this.$firebaseAuth(this._ref);
        }


        /**
        * getRef
        * @description - Return a Firebase Auth reference
        * @function
        * @return {AngularFireAuth} $firebaseAuth - firebase auth reference
        */
        getUserAuthData(): FirebaseAuthData {
            let self = this;
            //TODO: Analizar por que estoy obteniendo la session Auth con el
            // metodo $getAuth de Firebase no con mi metodo del servicio session
            // creo que va a ser necesario replatear esto: uso la sesion de firebase
            // o la que estoy creando yo?
            return this._authObj.$getAuth();
        }


        /**
        * _authDataCallback
        * @description - Create a callback which logs the current auth state
        * @function
        * @params {any} authData - User Authenticated Data
        */
        private _authDataCallback (authData): void {
            if (authData) {
                console.log('AUTH LOG: User ' + authData.uid + ' is logged in with: ' + authData.provider);
            } else {
                console.log('AUTH LOG: User is logged out');
            }
        }


        /**
        * _authHandler
        * @description - Create a callback to handle the result of the authentication
        * @function
        * @params {any} error - User authentication Error
        * @params {any} authData - User Authenticated Data
        */
        private _authHandler (error, authData): void {
            if (error) {
                console.log('Login Failed!', error);
            } else {
                console.log('Authenticated successfully with payload:', authData);
            }
        }


        /**
        * isLoggedIn
        * @description - Valid if current user is logged in
        * @function
        * @return {boolean} this.session.getAuthData() - launch session getAuthData methods
        * in order to get user data Authenticated. If don't return data, it means the current
        * user is not logged in
        */
        isLoggedIn (): boolean {
          return this.session.getAuthData() !== null;
        }

        //TODO: Remove when don't need
        logInGitHug (): any {
            let self = this;
            return this._authObj
                .$authWithOAuthPopup('github', {
                    scope: 'user'
                })
                .then(
                    function(authData){
                        self.session.setAuthData(authData);
                        return authData;
                    },
                    function(error){
                        self.$q.reject(error);
                    }
                );
        }


        /**
        * logInPassword
        * @description - take current data user in order to log it in Firebase Auth system
        * @function
        * @params {app.interfaces.IUserDataAuth} currentDataUser - User Authenticated Data
        * @return {angular.IPromise<any>} promise - return user authentication data promise
        */
        logInPassword (currentDataUser): angular.IPromise<FirebaseAuthData> {
            let self = this;
            return this._authObj
            .$authWithPassword(currentDataUser)
            .then(
                function(authData: FirebaseAuthData){
                    //LOG
                    console.log('Authenticated successfully with payload:', authData);
                    self.session.setAuthData(authData);
                    return authData;
                },
                function(error){
                    self.$q.reject(error);
                }
            );
        }


        /**
        * signUpPassword
        * @description - Create Account on Firebase Accounting System
        * @function
        * @params {app.interfaces.IUserDataAuth} currentDataUser - User Authenticated Data
        * @return {angular.IPromise<any>} promise - return user uid created promise
        */
        signUpPassword (currentDataUser): angular.IPromise<Object> {
            let self = this;
            return this._authObj
            .$createUser(currentDataUser)
            .then(
                function(userUid: Object) {
                    //LOG
                    console.log('created new user in FireBase Auth System: ', userUid);
                    return userUid;
                },
                function(error) {
                    self.$q.reject(error);
                }
            );
        }


        /**
        * logOut
        * @description - log out and destroy current user's session
        * @function
        * @return {void}
        */
        logOut (): void {
          this._authObj.$unauth();
          this.session.destroy();
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
    .module('finApp.auth', [])
    .service(AuthService.serviceId, AuthService);

}
