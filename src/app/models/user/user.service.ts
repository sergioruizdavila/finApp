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
        existUserByEmail: (email: string) => angular.IPromise<boolean>;
        getUserByUid: (uid: string) => angular.IPromise<AngularFireObject>;
        getUserByEmail: (email: string) => AngularFireObject;
        getAllUsers: () => angular.IPromise<AngularFireArray>;
        bindingUser: (uid: string, $rootScope: app.interfaces.IFinAppRootScope) => any;
        createNewUser: (newUser: app.models.user.User, callback: (err) => void) => void;
        saveFirstTime: (firstTime: string) => void;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class UserService implements IUserService {

        static serviceId = 'finApp.models.user.UserService';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        ref: Firebase;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['finApp.core.firebase.FirebaseFactory',
                          '$firebaseObject',
                          '$firebaseArray',
                          '$rootScope'];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private FirebaseFactory: app.core.firebase.IFirebaseFactory,
            private $firebaseObject: AngularFireObjectService,
            private $firebaseArray: AngularFireArrayService,
            private $rootScope: app.interfaces.IFinAppRootScope) {

            this.ref = this.FirebaseFactory.createFirebase();

        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * getUserByUid
        * @description - get user by Uid
        * @use - this.FinanceService.getUserByUid('98d667ae-2231-4347-8a94-b955baf218f6');
        * @function
        * @params {string} uid - user uid
        * @return {angular.IPromise<AngularFireObject>} promise - return user by Id
        */
        getUserByUid(uid): angular.IPromise<AngularFireObject> {
            let url = '/users/' + uid;
            return this.FirebaseFactory.getObject(url).then(function(data){
                return data;
            }).catch(function(err) {
                console.log(err);
                return err;
            });
        }

        /**
        * getUserByEmail
        * @description - get an expecific User by Email
        * @function
        * @params {string} email - valid email string
        * @return {AngularFireObjectService} firebaseObject - Return a AngularFireArray object
        */
        getUserByEmail(email): AngularFireObject {
            let userRef = this.ref.child(email);
            return this.$firebaseObject(userRef);
        }

        /**
        * getAllUsers
        * @description - get all Users
        * @function
        * @return {angular.IPromise<AngularFireArray>} return a promise with
        * users list
        */
        getAllUsers(): angular.IPromise<AngularFireArray> {
            let url = '/users/';
            return this.FirebaseFactory.getArray(url).then(function(data){
                return data;
            }).catch(function(err) {
                console.log(err);
                return err;
            });
        }


        /**
        * createNewUser
        * @description - create new User
        * @function
        * @params {app.model.user.User} newUser - include the user information object
        * @params {function} callback - function callback required to know if create new user was Ok
        */
        createNewUser(newUser, callback): void {
            let url = '/users/' + newUser.Uid;
            this.FirebaseFactory.add(url, newUser, callback);
            /* TODO: Legacy method - remove when it's neccessary
            let userRef = this.ref.child('users/' + newUser.Uid);
            userRef.set(newUser, callback); */
        }

        /**
        * saveFirstTime
        * @description - update user first time property on firebase
        * @function
        * @params {string} firstTime - user first time data
        * @params {function} callback - function callback required to know if
        * It updated user first time data
        */
        saveFirstTime(firstTime): void {
            let url = '/users/' + this.$rootScope.User.Uid + '/firstTime';
            this.FirebaseFactory.addWithPromise(url, firstTime);
        }


        /**
        * bindingUser
        * @description - Bind a new User in dataBase and make three binding ways
        * @function
        * @params {string} uid - user logged uid
        * @params {app.interfaces.IFinAppRootScope} $rootScope
        * @return {AngularFireObjectService} firebaseObject - Return an Element as a
        *                                    synchronized three bind object.
        */
        bindingUser(uid, $rootScope): any {
            let newUserRef = this.ref.child('users').child(uid);
            return this.$firebaseObject(newUserRef).$bindTo($rootScope, 'User').then(function() {
                console.log($rootScope.User);
                $rootScope.User.foo = 'baz';  // will be saved to the database
                this.ref.set({ foo: 'baz' });  // this would update the database and $scope.data
            });
        }


        /**
        * existUserByEmail
        * @description - look for each user on database, and after that It checks if there is
                         an 'user' with specific 'email'. If exist a user with this email return true,
                         if not, return false.
        * @function
        * @params {string} email - valid email string
        * @return {angular.IPromise<boolean>} promise - return a firebaseArray promise
        */
        existUserByEmail(email): angular.IPromise<boolean> {

            let promise = this.$firebaseArray(this.ref).$loaded().then(function(data) {

                for (let i = 0; i < data.length; i++) {

                    if(data[i].$id === 'users') {
                        for (let key in data[i]) {
                            let obj = data[i][key] || { email: null };
                            if (obj.email === email) {
                                return true;
                            }
                        }

                        return false;
                    }
                }
                return false;
                
            }).catch(function(err) {
                console.log(err);
                return err;
            });

            return promise;
        }

        /**********************************/
        /*        INSTANCE FACTORY        */
        /**********************************/
        static instance(FirebaseFactory: app.core.firebase.IFirebaseFactory,
            $firebaseObject: AngularFireObjectService,
            $firebaseArray: AngularFireArrayService,
            $rootScope: app.interfaces.IFinAppRootScope): IUserService {

            return new UserService(FirebaseFactory, $firebaseObject, $firebaseArray, $rootScope);

        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.models.user', [])
        .factory(UserService.serviceId, ['finApp.core.firebase.FirebaseFactory',
            '$firebaseObject',
            '$firebaseArray',
            '$rootScope',
            UserService.instance]);

}
