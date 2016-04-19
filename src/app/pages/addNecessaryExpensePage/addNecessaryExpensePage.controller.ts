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
        showExpenseDetailPopup: () => void;
        activate: () => void;
        showTipPopup: () => void;
        goToNext: () => void;
        goToBack: () => void;
    }

    export interface IAddNecessaryExpenseForm {
        expense: any;
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
        static $inject = ['dataConfig',
                          '$ionicHistory',
                          '$ionicPopup',
                          '$filter',
                          'finApp.models.finance.FinanceService',
                          'finApp.core.util.FunctionsUtilService',
                          '$state',
                          '$scope',
                          '$rootScope'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private dataConfig: IDataConfig,
        private $ionicHistory: ionic.navigation.IonicHistoryService,
        private $ionicPopup: ionic.popup.IonicPopupService,
        private $filter: angular.IFilterService,
        private FinanceService: app.models.finance.IFinanceService,
        private FunctionsUtilService: app.core.util.functionsUtil.FunctionsUtilService,
        private $state: ng.ui.IStateService,
        private $scope: any,
        private $rootScope: app.interfaces.IFinAppRootScope) {
            this.init();
        }

        /*-- INITIALIZE METHOD --*/
        private init() {
            //Init form
            this.form = {
                expense: {
                    value: {
                        num: null,
                        formatted: ''
                    },
                    title: ''
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
        * Show tip example expenses popup
        * @description this method is launched when user press Gift icon in order to receive more information
        */
        showTipPopup(): void {
            //CONSTANTS
            const POPUP_TITLE = this.$filter('translate')('%popup.tip.example.title.text');
            const POPUP_OK_BUTTON_TEXT = this.$filter('translate')('%popup.tip.example.ok_button.text');
            const POPUP_OK_BUTTON_TYPE = 'button-positive';

            this.$ionicPopup.show({
                title: POPUP_TITLE,
                templateUrl: 'templates/components/popup/listPopup/listPopup.html',
                buttons: [
                    {
                        text: POPUP_OK_BUTTON_TEXT,
                        type: POPUP_OK_BUTTON_TYPE
                    }
                ]
            });
        }

        /*
        * show expense detail popup
        * @description this method is launched when user press Add button in the header
        */
        showExpenseDetailPopup(): void {
            //VARIABLES
            let self = this;
            //CONSTANTS
            const POPUP_BODY_CLASS = 'expenseDetailPopup';
            const POPUP_TITLE = this.$filter('translate')('%popup.add_expense.title.text');
            const POPUP_CANCEL_BUTTON_TEXT = this.$filter('translate')('%popup.general.cancel_button.text');
            const POPUP_ADD_BUTTON_TEXT = this.$filter('translate')('%popup.add_expense.add_button.text');
            const POPUP_ADD_BUTTON_TYPE = 'button-positive';

            this.$ionicPopup.show({
                title: POPUP_TITLE,
                template: '<fa-expense-detail-popup></fa-expense-detail-popup>',
                cssClass: POPUP_BODY_CLASS,
                scope: self.$scope,
                buttons: [
                    { text: POPUP_CANCEL_BUTTON_TEXT },
                    {
                        text: POPUP_ADD_BUTTON_TEXT,
                        type: POPUP_ADD_BUTTON_TYPE,
                        onTap: function(e) {
                            let expense = this.scope.vm.form.expense;
                            self._addOrEditExpense(expense);
                        }
                    }
                ]
            });
        }

        /*
        * Add or Edit Expense
        * @description this method is launched when user press Add button on expenseDetailPopup
        */
        _addOrEditExpense(expense): void {
            //TODO: Preguntar si este gasto ya existe, si ya existe toca llamar al servicio que
            // que edite un gasto en firebase, y actualizarlo inmediatamente en la lista. Si es
            // un nuevo gasto, lo que deberia hacer es crear un nuevo gasto en Firebase, e inmediatamente
            // despues agregarlo a las lista de gastos de la visual.

            //Update User model
            this.$rootScope.User.Finance.Expense.addNecessaryExpense(expense);
            //Save necessary expense on firebase
            this.FinanceService.addNewNecessaryExpense(expense);

            console.log(expense);
        }

        /*
        * Go to business page
        * @description this method is launched when user press OK button
        */
        goToNext(): void {
            //TODO: Asignar los gastos necesarios al objeto User.Finance
            //this.$rootScope.User.Finance.Investment = this.form.expenses;
            this.$state.go('page.innecessaryExpense');
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
