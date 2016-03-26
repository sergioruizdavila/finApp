/**
 * AddInvestmentPageController
 * @description - Add Investment Page Controller
 */

module app.pages.addInvestmentPage {

    export interface IAddInvestmentPageController {
        activate: () => void;
    }

    export class AddInvestmentPageController implements IAddInvestmentPageController {

        static controllerId = 'finApp.pages.addInvestmentPage.AddInvestmentPageController';

        static $inject = ['$ionicHistory'];

        constructor(private $ionicHistory: ionic.navigation.IonicHistoryService) {
            this.init();
        }

        //Init Properties
        private init() {
            this.activate();
        }

        activate(): void {
            console.log('addInvestmentPage controller actived');
        }

        /*-- METHODS --*/
        goToBack(): void {
            this.$ionicHistory.goBack();
        }

    }

    angular
        .module('finApp.pages.addInvestmentPage')
        .controller(AddInvestmentPageController.controllerId, AddInvestmentPageController);

}
