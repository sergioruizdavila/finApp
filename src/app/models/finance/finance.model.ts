/// <reference path="./finance.service.ts"/>

/**
 * Specifies the Classes and Interfaces related to Users in our Model
 */

module app.models.finance {

    /****************************************/
    /*              INTERFACES              */
    /****************************************/

    export interface IMoney {
        num: number;
        formatted: string;
    }

    export interface IExpense {
        uid: string;
        title: string;
        value: IMoney;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/

    export class Finance {

        /*-- PROPERTIES --*/
        private income: Income;
        private necessaryExpenses: Array<Expense>;
        private unnecessaryExpenses: Array<Expense>;


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            //LOG
            console.log('init finances');

            //init properties
            this.income = new Income();
            this.necessaryExpenses = [];
            this.unnecessaryExpenses = [];

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Income() {
            return this.income;
        }

        get NecessaryExpenses() {
            return this.necessaryExpenses;
        }

        get UnnecessaryExpenses() {
            return this.unnecessaryExpenses;
        }

        setNecessaryExpense(expense: Expense): Expense {
            if (expense === undefined) { throw 'Please supply neccesary expense value'; }
            if(expense.Uid) {
                var newExpense = expense;
                this.necessaryExpenses.forEach(function (element, index, array) {
                    if (newExpense.Uid === element.Uid) {
                        array[index] = newExpense;
                    }
                });
                return newExpense;
            } else {
                var fmt = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
                var guid = fmt.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
                expense.Uid = guid;
                this.necessaryExpenses.push(expense);
                return expense;
            }
        }

        setUnnecessaryExpense(expense: Expense): void {
            if (expense === undefined) { throw 'Please supply unneccesary expense value'; }
            this.unnecessaryExpenses.push(expense);
        }

    }

    /****************************************/
    /*             INCOME CLASS             */
    /****************************************/

    export class Income {

        /*-- PROPERTIES --*/
        private salary: IMoney;
        private investment: IMoney;
        private business: IMoney;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            //LOG
            console.log('init income');

            //init properties
            this.salary = {num: null, formatted: ''};
            this.investment = {num: null, formatted: ''};
            this.business = {num: null, formatted: ''};
        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Salary() {
            return this.salary;
        }

        set Salary(salary: IMoney) {
            if (salary === undefined) { throw 'Please supply salary value'; }
            this.salary = salary;
        }

        get Investment() {
            return this.investment;
        }

        set Investment(investment: IMoney) {
            if (investment === undefined) { throw 'Please supply investment value'; }
            this.investment = investment;
        }

        get Business() {
            return this.business;
        }

        set Business(business: IMoney) {
            if (business === undefined) { throw 'Please supply business value'; }
            this.business = business;
        }
    }



    /****************************************/
    /*             EXPENSE CLASS            */
    /****************************************/

    export class Expense {

        /*-- PROPERTIES --*/
        private uid: string;
        private title: string;
        private value: IMoney;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            //LOG
            console.log('init expense');

            //init properties
            this.uid = '';
            this.title = '';
            this.value = {num: null, formatted: ''};
        }

        /**********************************/
        /*             METHODS            */
        /**********************************/
        get Uid() {
            return this.uid;
        }

        set Uid(uid: string) {
            if (uid === undefined) { throw 'Please supply uid value'; }
            this.uid = uid;
        }

        get Title() {
            return this.title;
        }

        set Title(title: string) {
            if (title === undefined) { throw 'Please supply title value'; }
            this.title = title;
        }

        get Value() {
            return this.value;
        }

        set Value(value: IMoney) {
            if (value === undefined) { throw 'Please supply value'; }
            this.value = value;
        }

    }

}
