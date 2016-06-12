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
        private cards: Array<app.models.card.UserCard>;

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
                this.cards = [];
            } else {
                for (let key in obj.finances) {
                    let financeInstance = new app.models.finance.Finance(obj.finances[key]);
                    this.finances = [];
                    this.addFinance(financeInstance);
                }
                for (let key in obj.cards) {
                    let cardInstance = new app.models.card.UserCard(obj.cards[key]);
                    this.cards = [];
                    this.addCard(cardInstance);
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

        get Card() {
            return this.cards;
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

        addCard(card: app.models.card.UserCard): void {
            if(card === undefined) { throw 'Please supply user card element (Add)'; }
            this.cards.push(card);
        }
        /*TODO: No estoy seguro si es necesario la funcion editCard, ya que yo
        no quiero editar una tarjeta*/
        editCard(card: app.models.card.UserCard): void {
            if(card === undefined) { throw 'Please supply user card element (Edit)'; }
            //Edit existing Card
            this.cards.forEach(function (element, index, array) {
                if (card.Uid === element.Uid) {
                    array[index] = card;
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
