/**
 * Specifies the Classes and Interfaces related to Users in our Model
 */

module app.models {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IUser {
        username: string;
        email: string;
        password: string;
        salary: IMoney;
        investment: IMoney;
        business: IMoney;
    }

    export interface IMoney {
        num: number;
        formatted: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class User implements IUser {

        username: string;
        email: string;
        password: string;
        salary: IMoney;
        investment: IMoney;
        business: IMoney;
        
        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(data?) {
            if (data) {
                this.username = data.username;
                this.email = data.email;
                this.password = data.password;
                this.salary = data.salary;
                this.investment = data.investment;
                this.business = data.business;
            }
        }

    }

}
