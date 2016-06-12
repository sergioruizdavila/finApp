/**
 * Specifies the Classes and Interfaces related to Cards in our Model
 */

module app.models.card {

    /****************************************/
    /*              INTERFACES              */
    /****************************************/

    export interface ICard {
        uid: string;
        title: string;
        description: string;
        emblem: string;
        formulaId: string;
        amount: number;
        status: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/

    export class Card {

        /*-- PROPERTIES --*/
        private uid: string;
        private title: string;
        private description: string;
        private emblem: string;
        private formulaId: string;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Card Model instanced');

            //init properties
            this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
            this.title = obj.title || '';
            this.description = obj.description || '';
            this.emblem = obj.emblem || '';
            this.formulaId = obj.formulaId || '';

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Uid() {
            return this.uid;
        }

        set Uid(uid: string) {
            if (uid === undefined) { throw 'Please supply card uid'; }
            this.uid = uid;
        }

        get Title() {
            return this.title;
        }

        set Title(title: string) {
            if (title === undefined) { throw 'Please supply card title'; }
            this.title = title;
        }

        get Description() {
            return this.description;
        }

        set Description(description: string) {
            if (description === undefined) { throw 'Please supply card description'; }
            this.description = description;
        }

        get Emblem() {
            return this.emblem;
        }

        set Emblem(emblem: string) {
            if (emblem === undefined) { throw 'Please supply card emblem'; }
            this.emblem = emblem;
        }

        get FormulaId() {
            return this.formulaId;
        }

        set FormulaId(formulaId: string) {
            if (formulaId === undefined) { throw 'Please supply card formulaId'; }
            this.formulaId = formulaId;
        }

    }


    export class UserCard {

        /*-- PROPERTIES --*/
        private cardId: string;
        private amount: number;
        private status: string;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('User Card Model instanced');

            //init properties
            this.cardId = obj.cardId;
            this.amount = obj.amount || 0;
            this.status = obj.status || '';

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get CardId() {
            return this.cardId;
        }

        set CardId(cardId: string) {
            if (cardId === undefined) { throw 'Please supply card Id'; }
            this.cardId = cardId;
        }

        get Amount() {
            return this.amount;
        }

        set Amount(amount: number) {
            if (amount === undefined) { throw 'Please supply card amount'; }
            this.amount = amount;
        }

        get Status() {
            return this.status;
        }

        set Status(status: string) {
            if (status === undefined) { throw 'Please supply card status'; }
            this.status = status;
        }

    }

}
