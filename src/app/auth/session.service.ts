/**
 * SessionService
 * @description - Session Service
 * @function
 * @param {app.core.firebase.FirebaseFactory} FirebaseFactory - Firebase connections.
 * @param {AngularFireAuthService} $firebaseAuth - AngularFire methods.
 */

module app.auth {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ISessionService {
        getAuthData:() => string;
        setAuthData: (authData: FirebaseAuthData) => void;
        destroy: () => void;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class SessionService implements ISessionService {

        static serviceId = 'finApp.auth.SessionService';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        private _authData: string = JSON.parse(this.localStorage.getItem('session.authData'));
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['finApp.localStorageService'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private localStorage) {
            console.log('session service called');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * get AuthData
        * @description - Return data user session Authenticated
        * @get
        * @return {string} this._authData - user session authenticated
        */
        getAuthData(): string {
            return this._authData;
        }

        /**
        * set AuthData
        * @description - set data user session Authenticated
        * @set
        * @params {any} authData - user session authenticated
        */
        setAuthData(authData): void {
            if (authData === undefined) { throw 'Please supply authData'; }
            this._authData = authData;
            this.localStorage.setItem('session.authData', JSON.stringify(authData));
        }

        /**
        * set AuthData
        * @description - set data user session Authenticated
        * @set
        * @params {any} authData - user session authenticated
        */
        destroy(): void {
            this.setAuthData(null);
        }

        /*
        TODO: Remover cuando no sea util
        getGitHubAccessToken(){
          if(this._authData && this._authData.github && this._authData.github.accessToken){
            return this._authData.github.accessToken;
          }
          return null;
        };
        */


    }

    /*-- MODULE DEFINITION --*/
    angular
    .module('finApp.auth')
    .service(SessionService.serviceId, SessionService);

}
