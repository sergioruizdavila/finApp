/**
 * TutorialPageController
 * @description - Tutorial Page Controller
 */

module app.pages.tutorialPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ITutorialPageController {
        activate: () => void;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class TutorialPageController implements ITutorialPageController {

        static controllerId = 'finApp.pages.tutorialPage.TutorialPageController';

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            console.log('tutorialPage controller actived');
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.pages.tutorialPage')
        .controller(TutorialPageController.controllerId, TutorialPageController);

}
