/**
 * Specifies the Classes and Interfaces related to Users in our Model
 */

module app.models.user {


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class User {

        /*-- PROPERTIES --*/
        private uid: string;
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
            this.uid = null;
            this.username = null;
            this.email = null;
            this.finance = new app.models.finance.Finance();

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
