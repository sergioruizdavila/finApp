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
        activate: () => void;
        showExpenseDetailPopup: (expense: app.models.finance.Expense) => void;
        showTipPopup: () => void;
        goToNext: () => void;
        goToBack: () => void;
    }

    export interface IAddUnnecessaryExpensePageScope extends angular.IScope {
        form: IAddUnnecessaryExpenseForm;
        popupConfig: app.interfaces.IPopup;
    }

    export interface IAddUnnecessaryExpenseDataConfig extends ng.ui.IStateParamsService {
        financeId: string;
    }

    export interface IAddUnnecessaryExpenseForm {
        expense: any;
        total?: app.models.finance.IMoney;
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
        financePos: number;
        addUnnecessaryExpenseDataConfig: IAddUnnecessaryExpenseDataConfig;
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
            '$stateParams',
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
            private $stateParams: IAddUnnecessaryExpenseDataConfig,
            private $scope: IAddUnnecessaryExpensePageScope,
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

            this.addUnnecessaryExpenseDataConfig = this.$stateParams;

            //Get Finance Position
            this.financePos = this.FunctionsUtilService.getPositionByUid(this.$rootScope.User.Finance,
                this.addUnnecessaryExpenseDataConfig.financeId);

            this.expensesList = angular.copy(
                this.$rootScope.User.Finance[this.financePos].TypeOfExpense.Unnecessaries
            );

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
        //TODO: Puedo hacer una clase base, para que los gastos hereden estos metodos como showTipPopup.
        showTipPopup(): void {
            //VARIABLES
            let self = this;
            //CONSTANTS
            const POPUP_BODY_CLASS = 'listPopup';
            const POPUP_TITLE = this.$filter('translate')('%popup.tip.example.title.text');
            const POPUP_OK_BUTTON_TEXT = this.$filter('translate')('%popup.tip.example.ok_button.text');
            const POPUP_TIP_SUBTITLE_TEXT = this.$filter('translate')('%popup.tip.example.new_unnecessary_expense.subtitle.text');
            const POPUP_TIP_EXAMPLE1_TEXT = this.$filter('translate')('%popup.tip.example.new_unnecessary_expense.example1.text');
            const POPUP_TIP_EXAMPLE2_TEXT = this.$filter('translate')('%popup.tip.example.new_unnecessary_expense.example2.text');
            const POPUP_TIP_EXAMPLE3_TEXT = this.$filter('translate')('%popup.tip.example.new_unnecessary_expense.example3.text');
            const POPUP_TIP_EXAMPLE4_TEXT = this.$filter('translate')('%popup.tip.example.new_unnecessary_expense.example4.text');
            const POPUP_TIP_EXAMPLE5_TEXT = this.$filter('translate')('%popup.tip.example.new_unnecessary_expense.example5.text');
            const POPUP_TIP_EXAMPLE6_TEXT = this.$filter('translate')('%popup.tip.example.new_unnecessary_expense.example6.text');
            const POPUP_TIP_EXAMPLE7_TEXT = this.$filter('translate')('%popup.tip.example.new_unnecessary_expense.example7.text');
            const POPUP_TIP_EXAMPLE8_TEXT = this.$filter('translate')('%popup.tip.example.new_unnecessary_expense.example8.text');
            const POPUP_OK_BUTTON_TYPE = 'button-positive';
            //Assign popUp's text to $scope
            self.$scope.popupConfig = {
                subtitle: POPUP_TIP_SUBTITLE_TEXT,
                textsList: [
                    POPUP_TIP_EXAMPLE1_TEXT,
                    POPUP_TIP_EXAMPLE2_TEXT,
                    POPUP_TIP_EXAMPLE3_TEXT,
                    POPUP_TIP_EXAMPLE4_TEXT,
                    POPUP_TIP_EXAMPLE5_TEXT,
                    POPUP_TIP_EXAMPLE6_TEXT,
                    POPUP_TIP_EXAMPLE7_TEXT,
                    POPUP_TIP_EXAMPLE8_TEXT
                ]
            };

            this.$ionicPopup.show({
                title: POPUP_TITLE,
                template: '<fa-list-popup></fa-list-popup>',
                cssClass: POPUP_BODY_CLASS,
                scope: self.$scope,
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
            //CONSTANTS
            const POPUP_BODY_CLASS = 'expenseDetailPopup';
            const POPUP_TITLE = this.$filter('translate')('%popup.add_expense.title.text');
            const POPUP_CANCEL_BUTTON_TEXT = this.$filter('translate')('%popup.general.cancel_button.text');
            const POPUP_ADD_BUTTON_TEXT = this.$filter('translate')('%popup.add_expense.add_button.text');
            const POPUP_ADD_UNNECESSARY_EXPENSE_SUBTITLE_TEXT = this.$filter('translate')('%popup.add_unnecessary_expense.subtitle.text');
            const POPUP_ADD_BUTTON_TYPE = 'button-positive';

            //Assign expense value
            self.$scope.form = {
                expense: expense ? expense : new app.models.finance.Expense()
            };
            //Assign popUp's text to $scope
            self.$scope.popupConfig = {
                subtitle: POPUP_ADD_UNNECESSARY_EXPENSE_SUBTITLE_TEXT
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
            let expenseWithUid = this.$rootScope.User.Finance[this.financePos].TypeOfExpense.setUnnecessaries(expense);
            //Save unnecessary expense on firebase
            this.FinanceService.saveUnnecessaryExpense(expenseWithUid, this.addUnnecessaryExpenseDataConfig.financeId);
            //Update expenses List view
            this.expensesList = angular.copy(this.$rootScope.User.Finance[this.financePos].TypeOfExpense.Unnecessaries);
            //Calculate Total Expenses
            this._calculateTotalExpenses(this.expensesList);

        }

        /*
        * Parse Expenses Object in order to calculate Total Expenses
        * @description this method is launched when user press OK button
        */
        //TODO: Codigo duplicado en addNecessaryExpensePage.controller
        _calculateTotalExpenses(expenses): void {
            //Parse expenses Object

            let expensesArray = expenses.map(function(obj) {
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
        //TODO: Codigo duplicado en addNecessaryExpensePage.controller
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
            this.$state.go('tabs.history');
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
