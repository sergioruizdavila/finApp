/**
 * MainController
 * @description - Main Page Controller
 */

module app.pages.main {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IMainController {
        activate: () => void;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class MainController implements IMainController {

        static controllerId = 'finApp.pages.main.MainController';

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            this.init();
        }

        /*-- INITIALIZE METHOD --*/
        private init() {
            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            console.log('main controller actived');
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.pages.main')
        .controller(MainController.controllerId, MainController);

}
