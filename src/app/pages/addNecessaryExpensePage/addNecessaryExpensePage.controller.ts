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
        activate: () => void;
        showExpenseDetailPopup: (expense: app.models.finance.Expense) => void;
        showTipPopup: () => void;
        goToNext: () => void;
        goToBack: () => void;
    }

    export interface IAddNecessaryExpenseForm {
        expense: any;
        total: app.models.finance.IMoney;
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
        expensesList: Array<app.models.finance.Expense>;
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
                expense: new app.models.finance.Expense(),
                total: { num: 0, formatted: '$0' }
            };

            this.expensesList = angular.copy(this.$rootScope.User.Finance.NecessaryExpenses);

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
        showExpenseDetailPopup(expense: app.models.finance.Expense): void {
            //VARIABLES
            let self = this;
            //TODO: CREAR VARIAS CONSTANTES AQUI QUE VAYAS ASOCIADOS A LO QUE ESTA QUEMADO
            // EN LA DIRECTIVA, PARA ASI ASIGNAR ESTAS CONSTANTES AL SCOPE Y ENVIARLAS PARA
            // MOSTRAR LOS TEXTOS DINAMICAMENTE Y NO QUEMADOS COMO ESTAN AHORA POR ALLA.

            //CONSTANTS
            const POPUP_BODY_CLASS = 'expenseDetailPopup';
            const POPUP_TITLE = this.$filter('translate')('%popup.add_expense.title.text');
            const POPUP_CANCEL_BUTTON_TEXT = this.$filter('translate')('%popup.general.cancel_button.text');
            const POPUP_ADD_BUTTON_TEXT = this.$filter('translate')('%popup.add_expense.add_button.text');
            const POPUP_ADD_BUTTON_TYPE = 'button-positive';

            //Assign expense value to $scope
            self.$scope.form = {
                expense: expense ? expense : new app.models.finance.Expense()
            };

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
                            let expense = angular.copy(this.scope.vm.form.expense);
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
            //Update User model
            let expenseWithUid = this.$rootScope.User.Finance.setNecessaryExpense(expense);
            //Save necessary expense on firebase
            this.FinanceService.saveNecessaryExpense(expenseWithUid);
            //Update expenses List view
            this.expensesList = angular.copy(this.$rootScope.User.Finance.NecessaryExpenses);
            //Calculate Total Expenses
            this._calculateTotalExpenses(this.expensesList);

        }

        /*
        * Parse Expenses Object in order to calculate Total Expenses
        * @description this method is launched when user press OK button
        */
        //TODO: Codigo duplicado en addUnnecessaryExpensePage.controller
        _calculateTotalExpenses(expenses): void {
            //Parse expenses Object

            let expensesArray = expenses.map(function(obj){
               return obj.value.num;
            });

            this.form.total.num = this.FinanceService.total(expensesArray);
            this.form.total.formatted = this.form.total.num.toString();
            this._formatTotal();
        }

        /*
        * Format Total value Method
        * @description Format the total value with default currency
        */
        //TODO: Codigo duplicado en addUnnecessaryExpensePage.controller
        _formatTotal(): void {
            let currencyObj: app.models.finance.IMoney =
            this.FunctionsUtilService.formatCurrency(this.form.total.num,
                                                     this.form.total.formatted);

            this.form.total.num = currencyObj.num;
            this.form.total.formatted = currencyObj.formatted;
        }

        /*
        * Go to unneccesary page
        * @description this method is launched when user press OK button
        */
        goToNext(): void {
            this.$state.go('page.unnecessaryExpense');
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
        .module('finApp.pages.addNecessaryExpensePage')
        .controller(AddNecessaryExpensePageController.controllerId, AddNecessaryExpensePageController);
}
