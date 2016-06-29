/**
 * CardFormulasService
 * @description - Services related on Card Formulas.
 * @constructor
 */

module app.core.cardFormulas {

    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ICardFormulasService {
        total: (numbers: Array<number>) => number;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class CardFormulasService implements ICardFormulasService {

        static serviceId = 'finApp.core.cardFormulas.CardFormulasService';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/

        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['dataConfig'];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private dataConfig: IDataConfig) {

        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * _dispatcher
        * @description - It is responsible for assigning the respective formulation
        * @function
        * @params {string} typeOfFormulaId - formula unique id
        */
        private _dispatcher(typeOfFormulaId: string): void {
            switch(typeOfFormulaId){
                case '1':
                this.total(230);
                break;
            }
        }

        /**
        * total
        * @description - sum each element and return the total value
        * @function
        * @params {Array<number>} numbers - numbers Array that we need to sum
        */
        total(numbers): number {
            let total = 0;
            for(var i = 0; i < numbers.length; i++) {
                total += numbers[i];
            }
            return total;
        }


        /**********************************/
        /*        INSTANCE FACTORY        */
        /**********************************/
        static instance(dataConfig: IDataConfig): ICardFormulasService {

            return new CardFormulasService(dataConfig);

        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.core.cardFormulas', [])
        .factory(CardFormulasService.serviceId, ['dataConfig',
            CardFormulasService.instance]);

}
