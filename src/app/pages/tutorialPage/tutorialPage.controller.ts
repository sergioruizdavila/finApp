/**
 * TutorialPageController
 * @description - Tutorial Page Controller
 */

module app.pages.tutorialPage {

    export interface ITutorialPageController {
        activate: () => void;
    }

    export class TutorialPageController implements ITutorialPageController {

        static controllerId = 'finApp.pages.tutorialPage.TutorialPageController';

        //static $inject = [''];

        constructor() {
            this.init();
        }

        //Init Properties
        private init() {
            this.activate();
        }

        activate(): void {
            console.log('tutorialPage controller actived');
        }

        /*-- METHODS --*/

    }

    angular
        .module('finApp.pages.tutorialPage')
        .controller(TutorialPageController.controllerId, TutorialPageController);

}
