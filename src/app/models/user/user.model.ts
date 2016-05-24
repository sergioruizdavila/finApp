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
        constructor(obj: any = {}) {
            //LOG
            console.log('User Model instanced');

            //init properties
            this.uid = obj.uid;
            this.username = obj.username || '';
            this.email = obj.email || '';

            if(_.isEmpty(obj)) {
                this.finances = [];
            } else {
                for (let key in obj.finances) {
                    let financeInstance = new app.models.finance.Finance(obj.finances[key]);
                    this.finances = [];
                    this.addFinance(financeInstance);
                }
            }

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

        addFinance(finance: app.models.finance.Finance): void {
            if(finance === undefined) { throw 'Please supply finance element (Add)'; }
            this.finances.push(finance);
        }

        editFinance(finance: app.models.finance.Finance): void {
            if(finance === undefined) { throw 'Please supply finance element (Edit)'; }
            //Edit existing Finance
            this.finances.forEach(function (element, index, array) {
                if (finance.Uid === element.Uid) {
                    array[index] = finance;
                }
            });
        }

    }


    /**
     * Specifies the Classes and Interfaces related to UserFirebase in our Model
     */

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class UserFirebase extends User {

        private provider: string;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj:any = {}) {
            //LOG
            console.log('UserFirebase Model instanced');

            //init properties
            super(obj);
            this.provider = obj.provider || null;

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
