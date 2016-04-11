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
        title: string;
        value: IMoney;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/

    export class Finance {

        /*-- PROPERTIES --*/
        private income: Income;
        private necessaryExpenses: Array<IExpense>;


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            //LOG
            console.log('init finances');

            //init properties
            this.income = new Income();
            this.necessaryExpenses = [];
        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Income() {
            return this.income;
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
            this.salary = {num: 0, formatted: '$0'};
            this.investment = {num: 0, formatted: '$0'};
            this.business = {num: 0, formatted: '$0'};
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
        private necessaryExpenses: Array<IExpense>;
        private unnecessaryExpenses: Array<IExpense>;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            //LOG
            console.log('init expense');

            //init properties
            this.necessaryExpenses = [];
            this.unnecessaryExpenses = [];
        }

        /**********************************/
        /*             METHODS            */
        /**********************************/


    }

}
