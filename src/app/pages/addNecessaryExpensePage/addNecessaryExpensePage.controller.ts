/**
 * AddNecessaryExpensePageController
 * @description - Add Necessary Expense Page Controller
 */

module app.pages.addNecessaryExpensePage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IAddNecessaryExpensePageController {
        form: IAddNecessaryExpenseForm;
        formatInvestment: () => void;
        activate: () => void;
        showTipPopup: () => void;
        goToNext: () => void;
        goToBack: () => void;
    }

    export interface IAddNecessaryExpenseForm {
        investment: app.models.finance.IMoney;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class AddNecessaryExpensePageController implements IAddNecessaryExpensePageController {

        static controllerId = 'finApp.pages.addNecessaryExpensePage.AddNecessaryExpensePageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IAddNecessaryExpenseForm;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$ionicHistory',
                          '$ionicPopup',
                          '$filter',
                          'finApp.core.util.FunctionsUtilService',
                          '$state',
                          '$rootScope'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $ionicHistory: ionic.navigation.IonicHistoryService,
        private $ionicPopup: ionic.popup.IonicPopupService,
        private $filter: angular.IFilterService,
        private FunctionsUtilService: app.core.util.functionsUtil.FunctionsUtilService,
        private $state: ng.ui.IStateService,
        private $rootScope: app.interfaces.IFinAppRootScope) {
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
            console.log('addNecessaryExpensePage controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /*
        * Format Investment Method
        * @description Format the investment value with default currency
        */
        formatInvestment(): void {
            let currencyObj: app.models.finance.IMoney =
            this.FunctionsUtilService.formatCurrency(this.form.investment.num,
                                                     this.form.investment.formatted);

            this.form.investment.num = currencyObj.num;
            this.form.investment.formatted = currencyObj.formatted;
        }

        /*
        *
        *
        */
        showTipPopup(): void {
            //CONSTANTS
            //const POPUP_TITLE = this.$filter('translate')('%popup.create_user.title.text');
            const POPUP_BODY_TEXT = this.$filter('translate')('%popup.create_user.body_message.text');
            //const POPUP_CANCEL_BUTTON_TEXT = this.$filter('translate')('%popup.general.cancel_button.text');
            //const POPUP_OK_BUTTON_TEXT = this.$filter('translate')('%popup.create_user.ok_button.text');
            const POPUP_OK_BUTTON_TYPE = 'button-positive';

            let tipInstance = this.$ionicPopup.show({
                title: 'Algunos ejemplos',
                templateUrl: 'templates/components/popup/listPopup.html',
                buttons: [
                    {
                        text: 'GRACIAS',
                        type: POPUP_OK_BUTTON_TYPE
                    }
                ]
            });
        }

        /*
        * Go to business page
        * @description this method is launched when user press OK button
        */
        goToNext(): void {
            this.$rootScope.User.Finance.Investment = this.form.investment;
            this.$state.go('page.business');
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
        .controller(AddNecessaryExpensePageController.controllerId, AddNecessaryExpensePageController);

}
