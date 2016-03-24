/**
 * AddSalaryPageController
 * @description - Add Salary Page Controller
 */

module app.pages.addSalaryPage {

    export interface IAddSalaryPageController {
        activate: () => void;
    }

    export class AddSalaryPageController implements IAddSalaryPageController {

        static controllerId = 'finApp.pages.addSalaryPage.AddSalaryPageController';

        static $inject = ['$ionicHistory'];

        constructor(private $ionicHistory: ionic.navigation.IonicHistoryService) {
            this.init();
        }

        //Init Properties
        private init() {
            this.activate();
        }

        activate(): void {
            console.log('addSalaryPage controller actived');
        }

        /*-- METHODS --*/
        goToBack(): void {
            this.$ionicHistory.goBack();
        }

    }

    angular
        .module('finApp.pages.addSalaryPage')
        .controller(AddSalaryPageController.controllerId, AddSalaryPageController);

}
