/**
 * UserService
 * @description - Services related on User Model.
 * @constructor
 * @param {app.core.firebase.IFirebaseFactory} FirebaseFactory - instance Firebase services.
 * @param {AngularFireObjectService} $firebaseObject - firebase provider that let create three binding objects.
 * @param {AngularFireArrayService} $firebaseArray - firebase provider that let create three binding array objects.
 */

module app.models.user {

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
        User: app.models.user.User;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    class UserService implements IUserService {

        static serviceId = 'finApp.models.user.UserService';

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

                    for (let key in users[i]) {

                        let obj = users[i][key] || { email: null };

                        if (obj.email === email) {
                            return true;
                        }

                    }

                    return false;

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
        .module('finApp.models.user', [])
        .factory(UserService.serviceId, ['finApp.core.firebase.FirebaseFactory',
            '$firebaseObject',
            '$firebaseArray', UserService.instance]);

}
