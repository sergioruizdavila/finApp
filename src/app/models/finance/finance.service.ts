/**
 * FinanceService
 * @description - Services related on Finance Model.
 * @constructor
 * @param {app.core.firebase.IFirebaseFactory} FirebaseFactory - instance Firebase services.
 * @param {AngularFireObjectService} $firebaseObject - firebase provider that let create three binding objects.
 * @param {AngularFireArrayService} $firebaseArray - firebase provider that let create three binding array objects.
 */

module app.models.finance {

    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IFinanceService {
        ref: any;
        saveIncome: (userId, type, value) => angular.IPromise<string>;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    class FinanceService implements IFinanceService {

        static serviceId = 'finApp.models.finance.FinanceService';

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
        * saveIncome
        * @description - save user salary, investment or business income on firebase
        * @function
        * @return {angular.IPromise<string>} ref - Return a ref of saving newSalary value
        */
        saveIncome(userId, type, value): angular.IPromise<string> {
            let userRef = this.ref.child('users')
                                  .child(userId)
                                  .child('finance')
                                  .child('income')
                                  .child(type);

            return userRef.update(value, function(error) {
                if (error) {
                    return error;
                } else {
                    return 'OK';
                }
            });

        }



        /**********************************/
        /*        INSTANCE FACTORY        */
        /**********************************/
        static instance(FirebaseFactory: app.core.firebase.IFirebaseFactory,
            $firebaseObject: AngularFireObjectService,
            $firebaseArray: AngularFireArrayService,
            $rootScope: app.interfaces.IFinAppRootScope): IFinanceService {

            return new FinanceService(FirebaseFactory, $firebaseObject, $firebaseArray, $rootScope);

        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.models.finance', [])
        .factory(FinanceService.serviceId, ['finApp.core.firebase.FirebaseFactory',
            '$firebaseObject',
            '$firebaseArray',
            '$rootScope',
            FinanceService.instance]);

}
