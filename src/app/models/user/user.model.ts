/**
 * Specifies the Classes and Interfaces related to Users in our Model
 */

module app.models.user {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/

    export interface IMoney {
        num: number;
        formatted: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class User {

        private username: string = null;
        private email: string = null;
        private salary: IMoney = {num: 0, formatted: '$0'};
        private investment: IMoney = {num: 0, formatted: '$0'};
        private business: IMoney = {num: 0, formatted: '$0'};

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            console.log('User Model instanced');
        }

        /**********************************/
        /*             METHODS            */
        /**********************************/
        get Username() {
            return this.username;
        }

        set Username(username: string) {
            this.username = username;
        }

        get Email() {
            return this.email;
        }

        set Email(email: string) {
            this.email = email;
        }

        get Salary() {
            return this.salary;
        }

        set Salary(salary: IMoney) {
            this.salary = salary;
        }

        get Investment() {
            return this.investment;
        }

        set Investment(investment: IMoney) {
            this.investment = investment;
        }

        get Business() {
            return this.business;
        }

        set Business(business: IMoney) {
            this.business = business;
        }

    }



    export class UserFirebase extends User {

        private provider: string = null;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            super();
            console.log('UserFirebase Model instanced');
        }

        /**********************************/
        /*             METHODS            */
        /**********************************/
        get Provider() {
            return this.provider;
        }

        set Provider(provider: string) {
            this.provider = provider;
        }

    }



}
