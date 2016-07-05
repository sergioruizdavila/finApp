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

    export interface IIncome {
        value: IMoney;
    }

    export interface IExpense {
        uid: string;
        title: string;
        value: IMoney;
    }

    export interface IFinance {
        uid: string;
        income: Income;
        typeOfExpense: TypeOfExpense;
        dateCreated: app.interfaces.IDateFormatted;
        dateUpdated: string;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/

    export class Finance {

        /*-- PROPERTIES --*/
        private uid: string;
        private income: Income;
        private expenses: TypeOfExpense;
        private dateCreated: app.interfaces.IDateFormatted;
        private dateUpdated: string;


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj:any = {}) {
            //LOG
            console.log('init finances');

            //init properties
            this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
            this.income = new Income(obj.income);
            this.expenses = new TypeOfExpense(obj.expenses);
            this.dateCreated = obj.dateCreated || app.core.util.functionsUtil.FunctionsUtilService.splitDateFormat(new Date().toString());
            this.dateUpdated = new Date().toString();

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Uid() {
            return this.uid;
        }

        set Uid(uid: string) {
            if (uid === undefined) { throw 'Please supply id (finance)'; }
            this.uid = uid;
        }

        get Income() {
            return this.income;
        }

        get TypeOfExpense() {
            return this.expenses;
        }

        get DateUpdated() {
            return this.dateUpdated;
        }

        set DateUpdated(date: string) {
            if (date === undefined) { throw 'Please supply Updated Date (finance)'; }
            this.dateUpdated = date;
        }

        set DateCreated(date: string) {
            if (date === undefined) { throw 'Please supply Created Date (finance)'; }
            this.dateCreated = app.core.util.functionsUtil.FunctionsUtilService.splitDateFormat(date);
        }

    }

    /****************************************/
    /*             INCOME CLASS             */
    /****************************************/

    export class Income {

        /*-- PROPERTIES --*/
        private uid: string;
        private salary: IIncome;
        private investment: IIncome;
        private business: IIncome;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {salary: {value: {}}, investment: {value: {}}, business: {value: {}}}) {
            //LOG
            console.log('init income');

            //init properties
            this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();

            this.salary = {
                value: {
                    num: obj.salary.value.num || null ,
                    formatted: obj.salary.value.formatted || ''
                }
            };

            this.investment = {
                value: {
                    num: obj.investment.value.num || null,
                    formatted: obj.investment.value.formatted || ''
                }
            };

            this.business = {
                value: {
                    num: obj.business.value.num || null,
                    formatted: obj.business.value.formatted || ''
                }
            };
        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Uid() {
            return this.uid;
        }

        set Uid(uid: string) {
            if (uid === undefined) { throw 'Please supply id (income)'; }
            this.uid = uid;
        }

        get Salary() {
            return this.salary;
        }

        set Salary(salary: IIncome) {
            if (salary === undefined) { throw 'Please supply salary value (income)'; }
            this.salary = salary;
        }

        get Investment() {
            return this.investment;
        }

        set Investment(investment: IIncome) {
            if (investment === undefined) { throw 'Please supply investment value (income)'; }
            this.investment = investment;
        }

        get Business() {
            return this.business;
        }

        set Business(business: IIncome) {
            if (business === undefined) { throw 'Please supply business value (income)'; }
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
        constructor(obj: any = {}) {
            //LOG
            console.log('init type of expense');

            if(obj != {}) {

                this.necessaries = [];
                for (let key in obj.necessaries) {
                    let expenseInstance = new app.models.finance.Expense(obj.necessaries[key]);
                    this.addNecessary(expenseInstance);
                }

                this.unnecessaries = [];
                for (let key in obj.unnecessaries) {
                    let expenseInstance = new app.models.finance.Expense(obj.unnecessaries[key]);
                    this.addUnnecessary(expenseInstance);
                }
            } else {
                this.necessaries = [];
                this.unnecessaries = [];
            }

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

        addNecessary(expense: Expense): void {
            if(expense === undefined) { throw 'Please supply neccesary expense value (Add)'; }
            this.necessaries.push(expense);
        }

        editNecessary(expense: Expense): void {
            if(expense === undefined) { throw 'Please supply neccesary expense value (Edit)'; }
            //Edit existing Finance
            this.necessaries.forEach(function (element, index, array) {
                if (expense.Uid === element.Uid) {
                    array[index] = expense;
                }
            });
        }

        addUnnecessary(expense: Expense): void {
            if(expense === undefined) { throw 'Please supply unneccesary expense value (Add)'; }
            this.unnecessaries.push(expense);
        }

        editUnnecessary(expense: Expense): void {
            if(expense === undefined) { throw 'Please supply unneccesary expense value (Edit)'; }
            //Edit existing Finance
            this.unnecessaries.forEach(function (element, index, array) {
                if (expense.Uid === element.Uid) {
                    array[index] = expense;
                }
            });
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
        constructor(obj: any = { value: {}}) {
            //LOG
            console.log('init expense');

            //init properties
            this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
            this.title = obj.title || '';
            this.value = {
                num: obj.value.num || null ,
                formatted: obj.value.formatted || ''
            };
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
