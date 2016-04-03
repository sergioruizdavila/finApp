/**
 * Specifies the Classes and Interfaces related to Users in our Model
 */

module app.models {

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

        private _username: string = null;
        private _email: string = null;
        private _password: string = 'temporalPassword';
        private _salary: IMoney = {num: 0, formatted: '$0'};
        private _investment: IMoney = {num: 0, formatted: '$0'};
        private _business: IMoney = {num: 0, formatted: '$0'};

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            console.log('User Model instanced');
        }

        get username() {
            return this._username;
        }

        set username(username: string) {
            this._username = username;
        }

        get email() {
            return this._email;
        }

        set email(email: string) {
            this._email = email;
        }

        get password() {
            return this._username;
        }

        set password(password: string) {
            this._password = password;
        }

        get salary() {
            return this._salary;
        }

        set salary(salary: IMoney) {
            this._salary = salary;
        }

        get investment() {
            return this._investment;
        }

        set investment(investment: IMoney) {
            this._investment = investment;
        }

        get business() {
            return this._business;
        }

        set business(business: IMoney) {
            this._business = business;
        }

    }

}
