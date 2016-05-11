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
        getAllFinances: () => angular.IPromise<AngularFireArray>;
        getFinancesByDate: (startDate: string, endDate: string) => void;
        getFinanceById: (financeId: string) => angular.IPromise<AngularFireObject>;
        /*-- mathematical calculations --*/
        total: (numbers: Array<number>) => number;
        getTotalIncomes: (incomes: any) => number;
        getTotalExpensesByType: (expenses: any) => number;
        getTotalExpenses: (expenses: any) => number;
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
        * saveFinance
        * @description - save user salary on firebase
        * @function
        * @params {string} newSalary - new value for user salary property
        */
        saveFinance(finance): void {
            let url = '/users/' + this.$rootScope.User.Uid + '/finances/' + finance.Uid;
            this.FirebaseFactory.add(url, finance);
        }

        /**
        * saveSalary
        * @description - save user salary on firebase
        * @function
        * @params {string} newSalary - new value for user salary property
        */
        saveSalary(newSalary): void {
            let url = '/users/' + this.$rootScope.User.Uid + this.dataConfig.salaryIncomeUrl;
            this.FirebaseFactory.update(url, newSalary);
        }

        /**
        * saveInvestment
        * @description - save user investment income on firebase
        * @function
        * @params {string} newSalary - new value for user investment property
        */
        saveInvestment(newInvestment): void {
            let url = '/users/' + this.$rootScope.User.Uid + this.dataConfig.investmentIncomeUrl;
            this.FirebaseFactory.update(url, newInvestment);
        }

        /**
        * saveBusiness
        * @description - save user business income on firebase
        * @function
        * @params {string} newBusiness - new value for user business property
        */
        saveBusiness(newBusiness): void {
            let url = '/users/' + this.$rootScope.User.Uid + this.dataConfig.businessIncomeUrl;
            this.FirebaseFactory.update(url, newBusiness);
        }

        /**
        * saveNecessaryExpense
        * @description - add/update neccesary expense on firebase
        * @function
        * @params {string} necessaryExpense - new value for user necessary expense property
        */
        saveNecessaryExpense(necessaryExpense, financeId): void {
            let url = '/users/' + this.$rootScope.User.Uid + '/finances/' + financeId + this.dataConfig.neccesaryExpenseUrl + necessaryExpense.Uid;
            this.FirebaseFactory.add(url, necessaryExpense);
        }

        /**
        * saveUnnecessaryExpense
        * @description - add/update unneccesary expense on firebase
        * @function
        * @params {string} unnecessaryExpense - new value for user unnecessary expense property
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
        getAllFinances(): angular.IPromise<AngularFireArray> {
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
        * @params {string} startDate - start specific date
        * @params {string} endDate - end specific date
        * @return {angular.IPromise<AngularFireArray>} promise - return Array of Finances by range of date
        */
        getFinancesByDate(startDate, endDate): angular.IPromise<AngularFireArray> {
            let url = '/users/' + this.$rootScope.User.Uid + '/finances/';
            return this.FirebaseFactory.getArrayByDate(url, startDate, endDate).then(function(data){
                return data;
            });
        }

        /**
        * getFinanceById
        * @description - get user's finances by finance Id
        * @use - this.FinanceService.getFinanceById('98d667ae-2231-4347-8a94-b955baf218f6');
        * @function
        * @params {string} financeId - start specific date
        * @return {angular.IPromise<AngularFireObject>} promise - return user's finance by Id
        */
        getFinanceById(financeId): angular.IPromise<AngularFireObject> {
            let url = '/users/' + this.$rootScope.User.Uid + '/finances/' + financeId;
            return this.FirebaseFactory.getObject(url).then(function(data){
                return data;
            });
        }

        /***********************************/
        /*    mathematical calculations    */
        /***********************************/

        /**
        * total
        * @description - sum each element and return the total value
        * @function
        * @params {Array<number>} numbers - numbers Array that we need to sum
        */
        total(numbers): number {
            let total = 0;
            for(var i = 0; i < numbers.length; i++) {
                total += numbers[i];
            }
            return total;
        }

        /**
        * getTotalIncomes
        * @description - get user's incomes total
        * @function
        * @params {any} incomes - user's incomes list
        * @return {number} total - total of user's incomes
        */
        //TODO: change any type to Array<Incomes>
        getTotalIncomes(incomes: any): number {
            //VARIABLES
            var incomesToArray = [];
            let total = 0;

            for (let key in incomes) {
                incomesToArray.push(incomes[key].num || 0);
            }

            total = this.total(incomesToArray);
            return total;
        }

        /**
        * getTotalExpensesByType
        * @description - get user's expenses total (by kind of expenses, i.e neccesaries)
        * @function
        * @params {any} expenses - user's expenses list by type
        * @return {number} total - total of user's expenses
        */
        //TODO: change any type to Array<Expenses>
        getTotalExpensesByType(expenses: any): number {
            //VARIABLES
            var expensesToArray = [];
            let total = 0;

            for (let key in expenses) {
                expensesToArray.push(expenses[key].value.num || 0);
            }

            total = this.total(expensesToArray);
            return total;
        }

        /**
        * getTotalExpenses
        * @description - get user's expenses total
        * @function
        * @params {any} expenses - user's expenses list
        * @return {number} total - total of user's expenses
        */
        //TODO: change any type to Array<Expenses>
        getTotalExpenses(expenses: any): number {
            //VARIABLES
            var expensesToArray = [];
            let total = 0;

            for (let type in expenses) {

                for (let key in expenses[type]) {
                    expensesToArray.push(expenses[type][key].value.num || 0);
                }

            }

            total = this.total(expensesToArray);
            return total;
        }

        /**
        * getSaving
        * @description: incomes - expenses = saving
        * @function
        * @params {number} incomes - sum of incomes
        * @params {number} expenses - sum of expenses
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
