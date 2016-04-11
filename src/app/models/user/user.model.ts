/**
 * Specifies the Classes and Interfaces related to Users in our Model
 */

module app.models.user {


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class User {

        /*-- PROPERTIES --*/
        private id: string;
        private username: string;
        private email: string;
        private finance: app.models.finance.Finance;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            //LOG
            console.log('User Model instanced');

            //init properties
            this.id = null;
            this.username = null;
            this.email = null;
            this.finance = new app.models.finance.Finance();

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: string) {
            if (id === undefined) { throw 'Please supply id'; }
            this.id = id;
        }

        get Username() {
            return this.username;
        }

        set Username(username: string) {
            if (username === undefined) { throw 'Please supply username'; }
            this.username = username;
        }

        get Email() {
            return this.email;
        }

        set Email(email: string) {
            if (email === undefined) { throw 'Please supply email'; }
            this.email = email;
        }

        get Finance() {
            return this.finance;
        }

    }


    /**
     * Specifies the Classes and Interfaces related to UserFirebase in our Model
     */

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
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
            if (provider === undefined) { throw 'Please supply provider'; }
            this.provider = provider;
        }

    }



}
