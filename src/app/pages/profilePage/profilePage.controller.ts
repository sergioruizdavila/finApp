/**
 * ProfilePageController
 * @description - Profile Page Controller
 */

module app.pages.profilePage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IProfilePageController {
        activate: () => void;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class ProfilePageController implements IProfilePageController {

        static controllerId = 'finApp.pages.profilePage.ProfilePageController';

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
            this.init();
        }

        /*-- INITIALIZE METHOD --*/
        private init() {

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            console.log('profilePage controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/




    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.pages.profilePage')
        .controller(ProfilePageController.controllerId, ProfilePageController);

}
