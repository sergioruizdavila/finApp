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

    export interface IAddNecessaryExpensePageScope extends angular.IScope {
        form: IAddNecessaryExpenseForm;
        popupConfig: app.interfaces.IPopup;
    }

    export interface IAddNecessaryExpenseDataConfig extends ng.ui.IStateParamsService {
        financeId: string;
        action: IActionParams;
    }

    export interface IActionParams {
        type: string;
        data: { total: app.models.finance.IMoney };
    }

    export interface IAddNecessaryExpenseForm {
        expense?: any;
        total?: app.models.finance.IMoney;
        action?: string;
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
        private _financePos: number;
        addNecessaryExpenseDataConfig: IAddNecessaryExpenseDataConfig;
        private _expensesList: Array<app.models.finance.Expense>;
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
                          '$rootScope',
                          'finApp.auth.AuthService'];

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
                    private $stateParams: IAddNecessaryExpenseDataConfig,
                    private $scope: IAddNecessaryExpensePageScope,
                    private $rootScope: app.interfaces.IFinAppRootScope,
                    private auth: app.auth.IAuthService) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //Validate if user is logged in
            this._isLoggedIn();

            this.addNecessaryExpenseDataConfig = this.$stateParams;

            //Init form
            this.form = {
                total: {
                    num: this.addNecessaryExpenseDataConfig.action.data.total.num || 0,
                    formatted: this.addNecessaryExpenseDataConfig.action.data.total.formatted || '$0'
                }
            };

            //Get Finance Position
            this._financePos = this.FunctionsUtilService.getPositionByUid(this.$rootScope.User.Finance,
                                                                         this.addNecessaryExpenseDataConfig.financeId);

            this._expensesList = angular.copy(
                this.$rootScope.User.Finance[this._financePos].TypeOfExpense.Necessaries
            );

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
        * Is Logged In Method
        * @description Validate if user is logged in.
        */
        private _isLoggedIn(): void {
            if(!this.auth.isLoggedIn()){
                this.$state.go('page.signUp');
                event.preventDefault();
            }
        }

        /*
        * Show tip example expenses popup
        * @description - This method is launched when user press Gift icon in order
        * to receive more information
        */
        showTipPopup(): void {
            //VARIABLES
            let self = this;
            //CONSTANTS
            const POPUP_BODY_CLASS = 'listPopup';
            const POPUP_TITLE = this.$filter('translate')('%popup.tip.example.title.text');
            const POPUP_OK_BUTTON_TEXT = this.$filter('translate')('%popup.tip.example.ok_button.text');
            const POPUP_TIP_SUBTITLE_TEXT = this.$filter('translate')('%popup.tip.example.new_necessary_expense.subtitle.text');
            const POPUP_TIP_EXAMPLE1_TEXT = this.$filter('translate')('%popup.tip.example.new_necessary_expense.example1.text');
            const POPUP_TIP_EXAMPLE2_TEXT = this.$filter('translate')('%popup.tip.example.new_necessary_expense.example2.text');
            const POPUP_TIP_EXAMPLE3_TEXT = this.$filter('translate')('%popup.tip.example.new_necessary_expense.example3.text');
            const POPUP_TIP_EXAMPLE4_TEXT = this.$filter('translate')('%popup.tip.example.new_necessary_expense.example4.text');
            const POPUP_TIP_EXAMPLE5_TEXT = this.$filter('translate')('%popup.tip.example.new_necessary_expense.example5.text');
            const POPUP_TIP_EXAMPLE6_TEXT = this.$filter('translate')('%popup.tip.example.new_necessary_expense.example6.text');
            const POPUP_TIP_EXAMPLE7_TEXT = this.$filter('translate')('%popup.tip.example.new_necessary_expense.example7.text');
            const POPUP_TIP_EXAMPLE8_TEXT = this.$filter('translate')('%popup.tip.example.new_necessary_expense.example8.text');
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
        * @description - This method is launched when user press Add button in the header
        */
        showExpenseDetailPopup(expense: app.models.finance.Expense): void {
            //VARIABLES
            let self = this;

            //CONSTANTS
            const POPUP_BODY_CLASS = 'expenseDetailPopup';
            const POPUP_TITLE = this.$filter('translate')('%popup.add_expense.title.text');
            const POPUP_CANCEL_BUTTON_TEXT = this.$filter('translate')('%popup.general.cancel_button.text');
            const POPUP_ADD_BUTTON_TEXT = this.$filter('translate')('%popup.add_expense.add_button.text');
            const POPUP_ADD_NECESSARY_EXPENSE_SUBTITLE_TEXT = this.$filter('translate')('%popup.add_necessary_expense.subtitle.text');
            const POPUP_ADD_BUTTON_TYPE = 'button-positive';

            //Assign expense value to $scope
            self.$scope.form = {
                expense: expense ? expense : new app.models.finance.Expense(),
                action: expense ? 'Edit' : 'Add'
            };
            //Assign popUp's text to $scope
            self.$scope.popupConfig = {
                subtitle: POPUP_ADD_NECESSARY_EXPENSE_SUBTITLE_TEXT
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
                            let expenseInstance = angular.copy(this.scope.vm.form.expense);

                            if(this.scope.vm.form.action == 'Add'){
                                //Update User model
                                self.$rootScope.User.Finance[self._financePos].TypeOfExpense.addNecessary(expenseInstance);
                            } else {
                                //Update User model
                                self.$rootScope.User.Finance[self._financePos].TypeOfExpense.editNecessary(expenseInstance);
                            }

                            //Update Finance Object on firebase
                            self.FinanceService.saveNecessaryExpense(
                                expenseInstance,
                                self.addNecessaryExpenseDataConfig.financeId,
                                function(err) {
                                    if (err) {
                                        //LOG
                                        console.log('Error: Not saved necessaryExpense');
                                    }
                                }
                            );

                            //Update expenses List view
                            self._expensesList = angular.copy(self.$rootScope.User.Finance[self._financePos].TypeOfExpense.Necessaries);
                            //Calculate Total Expenses
                            let totalNecessariesExpenses = self.FinanceService.getTotalExpensesByType(self._expensesList);
                            self.form.total = self.FunctionsUtilService.formatCurrency(totalNecessariesExpenses, '');

                        }
                    }
                ]
            });
        }

        /*
        * Go to unneccesary page
        * @description this method is launched when user press OK button
        */
        goToNext(): void {
            this.$state.go('page.unnecessaryExpense', {
                financeId: this.addNecessaryExpenseDataConfig.financeId,
                action: {
                    type: '',
                    data: {total: {num: null, formatted: ''} }
                }
            });
        }

        /*
        * Go to back method
        * @description this method is launched when user press back button
        */
        goToBack(): void {
            let viewBack = this.$ionicHistory.backView();
            this.$ionicHistory.goBack();
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.pages.addNecessaryExpensePage')
        .controller(AddNecessaryExpensePageController.controllerId,
                    AddNecessaryExpensePageController);
}
