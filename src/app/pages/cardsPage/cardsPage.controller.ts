/**
 * CardsPageController
 * @description - Cards Page Controller
 */

module app.pages.cardsPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ICardsPageController {
        activate: () => void;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class CardsPageController implements ICardsPageController {

        static controllerId = 'finApp.pages.cardsPage.CardsPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/

        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$state'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $state: ng.ui.IStateService) {
            this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            console.log('cardsPage controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/




    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.pages.cardsPage')
        .controller(CardsPageController.controllerId, CardsPageController);

}
