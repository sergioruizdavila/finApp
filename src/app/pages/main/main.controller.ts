/**
 * MainController
 * @description - Main Page Controller
 */

module app.pages.main {

    export interface IMainController {
        activate: () => void;
    }

    export class MainController implements IMainController {

        static controllerId = 'finApp.pages.main.MainController';

        //static $inject = [''];

        constructor() {
            this.init();
        }

        //Init Properties
        private init() {
            this.activate();
        }

        activate(): void {
            console.log('main controller actived');
        }

        /*-- METHODS --*/

    }

    angular
        .module('finApp.pages.main')
        .controller(MainController.controllerId, MainController);

}
