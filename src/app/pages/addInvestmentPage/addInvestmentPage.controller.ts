/**
 * AddInvestmentPageController
 * @description - Add Investment Page Controller
 */

module app.pages.addInvestmentPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IAddInvestmentPageController {
        form: IAddInvestmentForm;
        user: app.models.User;
        formatInvestment: () => void;
        activate: () => void;
        goToBack: () => void;
    }

    export interface IAddInvestmentForm {
        investment: app.models.IMoney;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class AddInvestmentPageController implements IAddInvestmentPageController {

        static controllerId = 'finApp.pages.addInvestmentPage.AddInvestmentPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IAddInvestmentForm;
        user: app.models.User;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$ionicHistory', 'finApp.core.util.FunctionsUtilService'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $ionicHistory: ionic.navigation.IonicHistoryService,
        private FunctionsUtilService: app.core.util.functionsUtil.FunctionsUtilService) {
            this.init();
        }

        /*-- INITIALIZE METHOD --*/
        private init() {
            //Init form
            this.form = {
                investment: {
                    num: null,
                    formatted: ''
                }
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            console.log('addInvestmentPage controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /*
        * Format Investment Method
        * @description Format the investment value with default currency
        */
        formatInvestment(): void {
            let currencyObj: app.models.IMoney =
            this.FunctionsUtilService.formatCurrency(this.form.investment.num, this.form.investment.formatted);

            this.form.investment.num = currencyObj.num;
            this.form.investment.formatted = currencyObj.formatted;
        }

        /*
        * Go to back method
        * @description this method is launched when user press back button
        */
        goToBack(): void {
            this.$ionicHistory.goBack();
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.pages.addInvestmentPage')
        .controller(AddInvestmentPageController.controllerId, AddInvestmentPageController);

}
