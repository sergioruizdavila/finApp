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
        private uid: string;
        private income: Income;
        private typeOfExpense: TypeOfExpense;
        private dateCreated: string;
        private dateUpdated: string;


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            //LOG
            console.log('init finances');

            //init properties
            this.uid = null;
            this.income = new Income();
            this.typeOfExpense = new TypeOfExpense();
            this.dateCreated = new Date().toString();
            this.dateUpdated = new Date().toString();

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Uid() {
            return this.uid;
        }

        set Uid(uid: string) {
            if (uid === undefined) { throw 'Please supply id'; }
            this.uid = uid;
        }

        get Income() {
            return this.income;
        }

        get TypeOfExpense() {
            return this.typeOfExpense;
        }

        get DateUpdated() {
            return this.dateUpdated;
        }

        set DateUpdated(date: string) {
            if (date === undefined) { throw 'Please supply Updated Date'; }
            this.dateUpdated = date;
        }

        set DateCreated(date: string) {
            if (date === undefined) { throw 'Please supply Created Date'; }
            this.dateCreated = date;
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
    /*         TYPE OF EXPENSE CLASS        */
    /****************************************/

    export class TypeOfExpense {
        /*-- PROPERTIES --*/
        private necessaries: Array<Expense>;
        private unnecessaries: Array<Expense>;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            //LOG
            console.log('init type of expense');

            //init properties
            this.necessaries = [];
            this.unnecessaries = [];
        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Necessaries() {
            return this.necessaries;
        }

        get Unnecessaries() {
            return this.unnecessaries;
        }

        setNecessaries(expense: Expense): Expense {
            if(expense === undefined) { throw 'Please supply neccesary expense value'; }

            //Update element in Array
            if(expense.Uid) {
                this.necessaries.forEach(function (element, index, array) {
                    if (expense.Uid === element.Uid) {
                        array[index] = expense;
                    }
                });
            //Add new element in Array
            } else {
                expense.Uid = app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
                this.necessaries.push(expense);
            }

            return expense;
        }

        setUnnecessaries(expense: Expense): Expense {
            if (expense === undefined) { throw 'Please supply unneccesary expense value'; }

            //Update element in Array
            if(expense.Uid){
                this.unnecessaries.forEach(function(element, index, array){
                    if(expense.Uid === element.Uid) {
                        array[index] = expense;
                    }
                });
            //Add new element in Array
            } else {
                expense.Uid = app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
                this.unnecessaries.push(expense);
            }

            return expense;
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
