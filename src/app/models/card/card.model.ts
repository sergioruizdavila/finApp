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
        typeOfFormulaId: string;
        amount?: number;
        status?: string;
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
        private typeOfFormulaId: string;
        private amount: number;
        private status: string;

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
            this.typeOfFormulaId = obj.typeOfFormulaId || '';
            this.amount = obj.amount || 0;
            this.status = obj.status || '';

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

        get TypeOfFormulaId() {
            return this.typeOfFormulaId;
        }

        set TypeOfFormulaId(typeOfFormulaId: string) {
            if (typeOfFormulaId === undefined) { throw 'Please supply card typeOfFormulaId'; }
            this.typeOfFormulaId = typeOfFormulaId;
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


    export class UserCard {

        /*-- PROPERTIES --*/
        private uid: string;
        private amount: number;
        private status: string;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('User Card Model instanced');

            //init properties
            this.uid = obj.uid;
            this.amount = obj.amount || 0;
            this.status = obj.status || '';

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Uid() {
            return this.uid;
        }

        set Uid(uid: string) {
            if (uid === undefined) { throw 'Please supply card Id'; }
            this.uid = uid;
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
