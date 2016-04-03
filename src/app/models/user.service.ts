/**
 * userService
 * @description - Some description
 * @constructor
 * @param {type} title - The title of the book.
 * @param {type} author - The author of the book.
 */

module app.models {

    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IUserService {
        ref: any;
        existUserByEmail: (email: string) => any;
        getUserByEmail: (email: string) => AngularFireObject;
    }

    export interface IUserRootScope extends angular.IRootScopeService {
        User: app.models.User;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    class UserService implements IUserService {

        static serviceId = 'finApp.models.UserService';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        ref: Firebase;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['finApp.core.firebase.FirebaseFactory',
            '$firebaseObject',
            '$firebaseArray'];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private FirebaseFactory: app.core.firebase.IFirebaseFactory,
            private $firebaseObject: AngularFireObjectService,
            private $firebaseArray: AngularFireArrayService) {

            this.ref = this.FirebaseFactory.createFirebase();

        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * getUserByEmail
        * @description - get an expecific User by Email
        * @function
        * @params {string} email - valid email string
        * @return {AngularFireObjectService} firebaseObject - Return an Element as a
        *                                    synchronized three bind object.
        */
        getUserByEmail(email): AngularFireObject {
            var userRef = this.ref.child(email);
            // return it as a synchronized object
            return this.$firebaseObject(userRef);
        }


        /**
        * existUserByEmail
        * @description - look for each user on database, and after that It checks if there is
                         an 'user' with specific 'email'. If exist a user with this email return true,
                         if not, return false.
        * @function
        * @params {string} email - valid email string
        * @return {ng.IPromise<boolean>} promise - return a firebaseArray promise
        */
        existUserByEmail(email): angular.IPromise<boolean> {

            let promise = this.$firebaseArray(this.ref).$loaded().then(function(users) {
                for (let i = 0; i < users.length; i++) {
                    if (users[i].email === email) {
                        return true;
                    }
                }
                return false;
            });

            return promise;
        }

        /**********************************/
        /*        INSTANCE FACTORY        */
        /**********************************/
        static instance(FirebaseFactory: app.core.firebase.IFirebaseFactory,
            $firebaseObject: AngularFireObjectService,
            $firebaseArray: AngularFireArrayService): IUserService {

            return new UserService(FirebaseFactory, $firebaseObject, $firebaseArray);

        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.models', [])
        .factory(UserService.serviceId, ['finApp.core.firebase.FirebaseFactory',
            '$firebaseObject',
            '$firebaseArray', UserService.instance]);

}
