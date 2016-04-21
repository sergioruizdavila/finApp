/**
 * AddUnnecessaryExpensePageController
 * @description - Add Unnecessary Expense Page Controller
 */

module app.pages.addUnnecessaryExpensePage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IAddUnnecessaryExpensePageController {
        form: IAddUnnecessaryExpenseForm;
        showExpenseDetailPopup: (expense: app.models.finance.IExpense) => void;
        activate: () => void;
        showTipPopup: () => void;
        goToNext: () => void;
        goToBack: () => void;
    }

    export interface IAddUnnecessaryExpenseForm {
        expense: any;
        total: app.models.finance.IMoney;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class AddUnnecessaryExpensePageController implements IAddUnnecessaryExpensePageController {

        static controllerId = 'finApp.pages.addUnnecessaryExpensePage.AddUnnecessaryExpensePageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IAddUnnecessaryExpenseForm;
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

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            console.log('addUnnecessaryExpensePage controller actived');
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
        showExpenseDetailPopup(expense: app.models.finance.IExpense): void {
            //VARIABLES
            let self = this;
            //CONSTANTS
            const POPUP_BODY_CLASS = 'expenseDetailPopup';
            const POPUP_TITLE = this.$filter('translate')('%popup.add_expense.title.text');
            const POPUP_CANCEL_BUTTON_TEXT = this.$filter('translate')('%popup.general.cancel_button.text');
            const POPUP_ADD_BUTTON_TEXT = this.$filter('translate')('%popup.add_expense.add_button.text');
            const POPUP_ADD_BUTTON_TYPE = 'button-positive';

            //Assign expense value
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
            this.$rootScope.User.Finance.addUnnecessaryExpense(expense);
            //Save necessary expense on firebase
            this.FinanceService.addNewUnnecessaryExpense(expense);
            //Calculate Total Expenses
            this._calculateTotalExpenses(this.$rootScope.User.Finance.UnnecessaryExpenses);

            console.log(expense);
        }

        /*
        * Parse Expenses Object in order to calculate Total Expenses
        * @description this method is launched when user press OK button
        */
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
        * Format Business Method
        * @description Format the business value with default currency
        */
        _formatTotal(): void {
            let currencyObj: app.models.finance.IMoney =
            this.FunctionsUtilService.formatCurrency(this.form.total.num,
                                                     this.form.total.formatted);

            this.form.total.num = currencyObj.num;
            this.form.total.formatted = currencyObj.formatted;
        }

        /*
        * Go to business page
        * @description this method is launched when user press OK button
        */
        goToNext(): void {
            //TODO: Aqui deberia llevarme a la pagina principal donde el usuario va
            // a gestionar todo, info del user, gastos mensuales, tarjetas, etc
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
        .module('finApp.pages.addUnnecessaryExpensePage')
        .controller(AddUnnecessaryExpensePageController.controllerId, AddUnnecessaryExpensePageController);
}
