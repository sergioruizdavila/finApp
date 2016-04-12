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
        getUsers: () => AngularFireArray;
        bindingUser: (uid: string, $rootScope: app.interfaces.IFinAppRootScope) => any;
        createUser: (newUser: app.models.user.User, callback: (err) => void) => void;
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
        * getUserByEmail
        * @description - get an expecific User by Email
        * @function
        * @params {string} email - valid email string
        * @return {AngularFireObjectService} firebaseObject - Return a AngularFireArray object
        */
        getUserByEmail(email): AngularFireObject {
            let userRef = this.ref.child(email);
            // return it as a synchronized object
            return this.$firebaseObject(userRef);
        }

        /**
        * getUsers
        * @description - get all Users
        * @function
        * @return {AngularFireArrayService} firebaseArray - Return a AngularFireArray object
        */
        getUsers(): AngularFireArray {
            // return it as a synchronized object
            return this.$firebaseArray(this.ref);
        }


        /**
        * createUser
        * @description - create new User
        * @function
        * @parameters {app.model.user.User} newUser - include the user information object
        * @parameters {function} callback - function callback required to know if create new user was Ok
        */
        createUser(newUser, callback): void {
            let userRef = this.ref.child('users/' + newUser.Uid);
            userRef.set(newUser, callback);
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
            //TODO: Analizar si esta la mejor manera de crear datos ( creando un bindeo de 3 caminos)
            let newUserRef = this.ref.child('users').child(uid);
            return this.$firebaseObject(newUserRef).$bindTo($rootScope, 'User').then(function() {
                console.log($rootScope.User); // { foo: "bar" }
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
