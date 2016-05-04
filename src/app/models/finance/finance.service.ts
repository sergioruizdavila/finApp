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
        saveFinance: (finance: Finance) => void;
        saveSalary: (newSalary: IMoney) => void;
        saveInvestment: (newInvestment: IMoney) => void;
        saveBusiness: (newBusiness: IMoney) => void;
        saveNecessaryExpense: (necessaryExpense: Expense, financeId: string) => void;
        saveUnnecessaryExpense: (unnecessaryExpense: Expense, financeId: string) => void;
        getAllFinances: () => angular.IPromise<Array<Finance>>;
        getFinancesByDate: (startDate: string, endDate: string) => void;
        /*-- mathematical calculations --*/
        total: (numbers: Array<number>) => number;
        getSaving: (incomes: number, expenses: number) => number;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class FinanceService implements IFinanceService {

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
        saveFinance(finance): void {
            let url = '/users/' + this.$rootScope.User.Uid + '/finances/' + finance.Uid;
            this.FirebaseFactory.add(url, finance);
        }

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
        * saveNecessaryExpense
        * @description - add/update neccesary expense on firebase
        * @function
        * @parameter {string} necessaryExpense - new value for user necessary expense property
        */
        saveNecessaryExpense(necessaryExpense, financeId): void {
            let url = '/users/' + this.$rootScope.User.Uid + '/finances/' + financeId + this.dataConfig.neccesaryExpenseUrl + necessaryExpense.Uid;
            this.FirebaseFactory.add(url, necessaryExpense);
        }

        /**
        * saveUnnecessaryExpense
        * @description - add/update unneccesary expense on firebase
        * @function
        * @parameter {string} unnecessaryExpense - new value for user unnecessary expense property
        */
        saveUnnecessaryExpense(unnecessaryExpense, financeId): void {
            let url = '/users/' + this.$rootScope.User.Uid + '/finances/' + financeId + this.dataConfig.unneccesaryExpenseUrl + unnecessaryExpense.Uid;
            this.FirebaseFactory.add(url, unnecessaryExpense);
        }

        /**
        * getFinances
        * @description - get user's finances
        * @function
        */
        getAllFinances(): angular.IPromise<Array<Finance>> {
            let url = '/users/' + this.$rootScope.User.Uid + '/finances/';
            return this.FirebaseFactory.getArray(url).then(function(data){
                return data;
            });
        }

        /**
        * getFinanceByDate
        * @description - get user's finances by specific date
        * @use - this.FinanceService.getFinancesByDate('Mon May 01 2016 01:23:34 GMT-0500 (COT)',
        *                                              'Mon May 03 2016 20:23:34 GMT-0500 (COT)');
        * @function
        * @parameter {string} userId - user uid on firebase
        * @parameter {string} startDate - start specific date
        * @parameter {string} endDate - end specific date
        */
        getFinancesByDate(startDate, endDate): any {
            let url = '/users/' + this.$rootScope.User.Uid + '/finances/';
            return this.FirebaseFactory.getArrayByDate(url, startDate, endDate).then(function(data){
                console.log(data);
            });
        }

        /***********************************/
        /*    mathematical calculations    */
        /***********************************/

        /**
        * total
        * @description - sum each element and return the total value
        * @function
        * @parameter {Array<number>} numbers - numbers Array that we need to sum
        */
        total(numbers): number {
            let total = 0;
            for(var i = 0; i < numbers.length; i++) {
                total += numbers[i];
            }
            return total;
        }

        /**
        * getSaving
        * @description: incomes - expenses = saving
        * @function
        * @parameter {number} incomes - sum of incomes
        * @parameter {number} expenses - sum of expenses
        */
        getSaving(incomes, expenses): number {
            let saving = 0;
            saving = incomes - expenses;
            return saving;
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
