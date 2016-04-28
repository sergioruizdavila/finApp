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
        private finances: Array<app.models.finance.Finance>;

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
            this.finances = [];

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
            return this.finances;
        }

        setFinance(finance: app.models.finance.Finance): app.models.finance.Finance {
            if(finance === undefined) { throw 'Please supply finance element'; }

            //Update element in Array
            if(finance.Uid) {
                this.finances.forEach(function (element, index, array) {
                    if (finance.Uid === element.Uid) {
                        array[index] = finance;
                    }
                });
            //Add new element in Array
            } else {
                finance.Uid = app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
                this.finances.push(finance);
            }

            return finance;
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
