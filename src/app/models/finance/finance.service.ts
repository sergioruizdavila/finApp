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
        saveSalary: (newSalary: IMoney) => void;
        saveInvestment: (newInvestment: IMoney) => void;
        saveBusiness: (newBusiness: IMoney) => void;
        addNewNecessaryExpense: (newNecessaryExpense: IExpense) => void;
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
        static $inject = ['dataConfig',
                          'finApp.core.firebase.FirebaseFactory',
                          '$firebaseObject',
                          '$firebaseArray',
                          '$rootScope'];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private dataConfig: IDataConfig,
                    private FirebaseFactory: app.core.firebase.IFirebaseFactory,
                    private $firebaseObject: AngularFireObjectService,
                    private $firebaseArray: AngularFireArrayService,
                    private $rootScope: app.interfaces.IFinAppRootScope) {

            this.ref = this.FirebaseFactory.createFirebase();

        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * saveSalary
        * @description - save user salary on firebase
        * @function
        * @parameter {string} newSalary - new value for user salary property
        */
        saveSalary(newSalary): void {
            let url = '/users/' + this.$rootScope.User.Uid + this.dataConfig.salaryIncomeUrl;
            this.FirebaseFactory.update(url, newSalary);
        }

        /**
        * saveInvestment
        * @description - save user investment income on firebase
        * @function
        * @parameter {string} newSalary - new value for user investment property
        */
        saveInvestment(newInvestment): void {
            let url = '/users/' + this.$rootScope.User.Uid + this.dataConfig.investmentIncomeUrl;
            this.FirebaseFactory.update(url, newInvestment);
        }

        /**
        * saveBusiness
        * @description - save user business income on firebase
        * @function
        * @parameter {string} newBusiness - new value for user business property
        */
        saveBusiness(newBusiness): void {
            let url = '/users/' + this.$rootScope.User.Uid + this.dataConfig.businessIncomeUrl;
            this.FirebaseFactory.update(url, newBusiness);
        }

        /**
        * addNewNecessaryExpense
        * @description - add new neccesary expense on firebase
        * @function
        * @parameter {string} newBusiness - new value for user business property
        */
        addNewNecessaryExpense(newNecessaryExpense): void {
            let url = '/users/' + this.$rootScope.User.Uid + this.dataConfig.neccesaryExpenseUrl;
            this.FirebaseFactory.add(url, newNecessaryExpense);
        }


        /**********************************/
        /*        INSTANCE FACTORY        */
        /**********************************/
        static instance(dataConfig: IDataConfig,
            FirebaseFactory: app.core.firebase.IFirebaseFactory,
            $firebaseObject: AngularFireObjectService,
            $firebaseArray: AngularFireArrayService,
            $rootScope: app.interfaces.IFinAppRootScope): IFinanceService {

            return new FinanceService(dataConfig, FirebaseFactory, $firebaseObject, $firebaseArray, $rootScope);

        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.models.finance', [])
        .factory(FinanceService.serviceId, ['dataConfig',
            'finApp.core.firebase.FirebaseFactory',
            '$firebaseObject',
            '$firebaseArray',
            '$rootScope',
            FinanceService.instance]);

}
