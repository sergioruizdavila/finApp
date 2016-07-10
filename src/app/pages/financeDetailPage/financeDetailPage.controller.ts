/**
 * FinanceDetailPageController
 * @description - Finance Detail Page Controller
 */

module app.pages.financeDetailPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IFinanceDetailPageController {
        activate: () => void;
        goToEditSalary: (value: app.models.finance.IMoney) => void;
        goToEditBusiness: (value: app.models.finance.IMoney) => void;
        goToEditInvestment: (value: app.models.finance.IMoney) => void;
        goToEditNecessariesExpenses: (expenses: Array<app.models.finance.IExpense>) => void;
        goToEditUnnecessariesExpenses: (expenses: Array<app.models.finance.IExpense>) => void;
        goToBack: () => void;
    }

    export interface IFinanceDetailDataConfig extends ng.ui.IStateParamsService {
        financeId: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class FinanceDetailPageController implements IFinanceDetailPageController {

        static controllerId = 'finApp.pages.financeDetailPage.FinanceDetailPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        financeDetailDataConfig: IFinanceDetailDataConfig;
        private _dateFormatted: app.interfaces.IDateFormatted;
        private _financeDetails: any;
        private _totalIncomes: app.models.finance.IMoney;
        private _totalNecessariesExpenses: app.models.finance.IMoney;
        private _totalUnnecessariesExpenses: app.models.finance.IMoney;
        private _totalSaving: app.models.finance.IMoney;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['dataConfig',
                          '$ionicHistory',
                          'finApp.models.finance.FinanceService',
                          'finApp.core.util.FunctionsUtilService',
                          '$filter',
                          '$state',
                          '$stateParams',
                          '$rootScope',
                          'finApp.auth.AuthService'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private dataConfig: IDataConfig,
                    private $ionicHistory: ionic.navigation.IonicHistoryService,
                    private FinanceService: app.models.finance.IFinanceService,
                    private FunctionsUtilService: app.core.util.functionsUtil.FunctionsUtilService,
                    private $filter: angular.IFilterService,
                    private $state: ng.ui.IStateService,
                    private $stateParams: IFinanceDetailDataConfig,
                    private $rootScope: app.interfaces.IFinAppRootScope,
                    private auth: app.auth.IAuthService) {
                this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //Validate if user is logged in
            this._isLoggedIn();

            this.financeDetailDataConfig = this.$stateParams;

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('financeDetailPage controller actived');
            //VARIABLES
            let self = this;

            //Get Finance Details
            this._getFinanceDetail(this.financeDetailDataConfig.financeId)
            .then(function(finance: any) {
                let financeInstance = new app.models.finance.Finance(finance);
                self._buildFinanceDetailsBlocks(finance);
            });
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /*
        * Is Logged In Method
        * @description Validate if user is logged in.
        */
        private _isLoggedIn(): void {
            if(!this.auth.isLoggedIn()) {
                this.$state.go('page.signUp');
                event.preventDefault();
            }
        }

        /*
        * _getFinanceDetail
        * @description this method is launched when user press OK button
        */
        private _getFinanceDetail(financeId): angular.IPromise<AngularFireObject> {
            return this.FinanceService.getFinanceById(financeId)
            .then(
                function(finance){
                    return finance;
                }
            );
        }

        /*
        * _buildFinanceDetailsBlocks
        * @description - build financial details blocks
        */
        private _buildFinanceDetailsBlocks(finance): void {
            //CONSTANTS
            const ZONE = this.$filter('translate')('%global.zone');
            //VARIABLES
            let dateFormatted = app.core.util.functionsUtil.FunctionsUtilService.splitDateFormat(finance.dateCreated.complete);
            dateFormatted.month = this.FunctionsUtilService.dateMonthToString(dateFormatted.complete, ZONE);
            let totalIncomes = this.FinanceService.getTotalIncomes(finance.income);
            let totalIncomesFormatted = this.FunctionsUtilService.formatCurrency(totalIncomes, '');
            // Necessary Expenses totalIncomes
            let totalNecessariesExpenses = 0;
            let totalNecessariesExpensesFormatted = {num: 0, formatted: '$0'};
            let totalUnnecessariesExpenses = 0;
            let totalUnnecessariesExpensesFormatted = {num: 0, formatted: '$0'};

            if(finance.typeOfExpense) {
                totalNecessariesExpenses = this.FinanceService.getTotalExpensesByType(finance.typeOfExpense.necessaries);
                totalNecessariesExpensesFormatted = this.FunctionsUtilService.formatCurrency(totalNecessariesExpenses, '');
                totalUnnecessariesExpenses = this.FinanceService.getTotalExpensesByType(finance.typeOfExpense.unnecessaries);
                totalUnnecessariesExpensesFormatted = this.FunctionsUtilService.formatCurrency(totalUnnecessariesExpenses, '');
            }

            let totalSaving = this.FinanceService.getSaving(totalIncomes, totalNecessariesExpenses + totalUnnecessariesExpenses);
            let totalSavingFormatted = this.FunctionsUtilService.formatCurrency(totalSaving, '');

            /* Charge values on each field blocks */
            // Assign date title header page
            this._dateFormatted = dateFormatted;
            // Assign total incomes value
            this._totalIncomes = totalIncomesFormatted;
            // Assign total necessaries expenses value
            this._totalNecessariesExpenses = totalNecessariesExpensesFormatted;
            // Assign total unnecessaries expenses value
            this._totalUnnecessariesExpenses = totalUnnecessariesExpensesFormatted;
            // Assign total saving
            this._totalSaving = totalSavingFormatted;
            // Assign finance gotten on scope vm
            this._financeDetails = finance;
        }

        /*
        * goToEditSalary
        * @description this method is launched when user press edit salary row,
        * Go to edit salary method
        * @params {app.models.finance.IIncome} salary - user's salary data
        */
        goToEditSalary(salary): void {
            this.$state.go('page.salary', {
                financeId: this.financeDetailDataConfig.financeId,
                action: {
                    type: 'Edit',
                    data: {
                        num: salary.value.num,
                        formatted: salary.value.formatted
                    }
                }
            });
        }

        /*
        * goToEditBusiness
        * @description this method is launched when user press edit business row,
        * Go to edit business method
        * @params {app.models.finance.IIncome} business - user's business data
        */
        goToEditBusiness(business): void {
            this.$state.go('page.business', {
                financeId: this.financeDetailDataConfig.financeId,
                action: {
                    type: 'Edit',
                    data: {
                        num: business.value.num,
                        formatted: business.value.formatted
                    }
                }
            });
        }

        /*
        * goToEditInvestment
        * @description this method is launched when user press edit investment row
        * Go to edit investment method
        * @params {app.models.finance.IIncome} investment - user's investment data
        */
        goToEditInvestment(investment): void {
            this.$state.go('page.investment', {
                financeId: this.financeDetailDataConfig.financeId,
                action: {
                    type: 'Edit',
                    data: {
                        num: investment.value.num,
                        formatted: investment.value.formatted
                    }
                }
            });
        }

        /*
        * goToEditNecessariesExpenses
        * @description this method is launched when user press edit necessary expense row
        * Go to edit expense method
        * @params {Array<app.models.finance.IExpense>} expenses - user's necessaries
        * expense data
        */
        goToEditNecessariesExpenses(expenses): void {
            this.$state.go('page.necessaryExpense', {
                financeId: this.financeDetailDataConfig.financeId,
                action: {
                    type: 'Edit',
                    data: this._totalNecessariesExpenses
                }
            });
        }

        /*
        * goToEditUnnecessariesExpenses
        * @description this method is launched when user press edit expense row
        * Go to edit expense method
        * @params {Array<app.models.finance.IExpense>} expenses - user's unnecessaries
        * expense data
        */
        goToEditUnnecessariesExpenses(expenses): void {
            this.$state.go('page.unnecessaryExpense', {
                financeId: this.financeDetailDataConfig.financeId,
                action: {
                    type: 'Edit',
                    data: this._totalUnnecessariesExpenses
                }
            });
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
        .module('finApp.pages.addBusinessPage')
        .controller(FinanceDetailPageController.controllerId, FinanceDetailPageController);

}
