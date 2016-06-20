/**
 * DashboardPageController
 * @description - Dashboard Page Controller
 */

module app.pages.historyPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IHistoryPageController {
        activate: () => void;
        goToDetail: (financeId: string) => void;
    }

    export interface IHistoryDataConfig extends ng.ui.IStateParamsService {

    }

    export interface IHistoryPageScope extends angular.IScope {
        popupConfig: app.interfaces.IPopup;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class HistoryPageController implements IHistoryPageController {

        static controllerId = 'finApp.pages.historyPage.HistoryPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        historyDataConfig: IHistoryDataConfig;
        private _financesList: Array<any>;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['dataConfig',
                          'finApp.models.finance.FinanceService',
                          'finApp.core.util.FunctionsUtilService',
                          'finApp.core.util.GiveRewardService',
                          'finApp.core.util.CustomPopupService',
                          '$state',
                          '$stateParams',
                          '$filter',
                          '$scope',
                          '$rootScope',
                          'finApp.auth.AuthService'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private dataConfig: IDataConfig,
                    private FinanceService: app.models.finance.IFinanceService,
                    private FunctionsUtilService: app.core.util.functionsUtil.FunctionsUtilService,
                    private GiveRewardService: app.core.util.giveReward.GiveRewardService,
                    private CustomPopupService: app.core.util.customPopup.CustomPopupService,
                    private $state: ng.ui.IStateService,
                    private $stateParams: IHistoryDataConfig,
                    private $filter: angular.IFilterService,
                    public $scope: IHistoryPageScope,
                    private $rootScope: app.interfaces.IFinAppRootScope,
                    private auth: app.auth.IAuthService) {
            this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            /*TODO: TEST, remove when you don't need it*/
            //this.GiveRewardService.giveCard('1');
            this.historyDataConfig = this.$stateParams;

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('historyPage controller actived');
            //VARIABLES
            let self = this;

            //Validate if user is logged in
            this._isLoggedIn();

            //Get All User's finances in order to draw each block
            this._getFinances().then(function(finances:any) {
                //grouping by year
                self._financesList = self._groupByYear(finances);
            });

            //Validate if is first time on app
            if(this.$rootScope.User.FirstTime) {
                //Give Card reward
                this.GiveRewardService.giveCard('1').then(
                    function(card) {
                        let popupConfig = {
                            cardData: card,
                            withPack: true
                        };
                        //Invoke card reward popup
                        self.CustomPopupService.invokeCardRewardPopup(self.$scope, popupConfig);
                    }
                );
            }

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

        /**
        * _getFinances
        * @description - get all Finances associated to user logged in
        * @function
        * @return {angular.IPromise<Array<app.models.finance.Finance>>} finances
        * promise - return user's finances data promise
        */
        private _getFinances(): angular.IPromise<AngularFireArray> {
            return this.FinanceService.getAllFinances().then(function(finances){
                return finances;
            });
        }


        /**
        * _groupByYear
        * @description - grouping finances by Year
        * @function
        * @params {any} finances - user's finances
        * @return {number} result - return finances grouped by Year
        */
        /* TODO: change any type. Analyze what is the best type */
        private _groupByYear(finances: any): Array<any> {
            //VARIABLES
            var groups = {};
            var result = [];

            for(var i = 0; i < finances.length; i++) {
                //CONSTANTS
                const ZONE = this.$filter('translate')('%global.zone');
                //VARIABLES
                var item = finances[i];
                let totalIncomes = this.FinanceService.getTotalIncomes(item.income);
                let totalIncomesFormatted = this.FunctionsUtilService.formatCurrency(totalIncomes, '');
                let totalExpenses = this.FinanceService.getTotalExpenses(item.typeOfExpense);
                let totalExpensesFormatted = this.FunctionsUtilService.formatCurrency(totalExpenses, '');
                let totalSaving = this.FinanceService.getSaving(totalIncomes, totalExpenses);
                let totalSavingFormatted = this.FunctionsUtilService.formatCurrency(totalSaving, '');

                if(!groups[item.dateCreated.year]) {
                    groups[item.dateCreated.year] = [];
                }

                groups[item.dateCreated.year].push({
                    uid: item.uid,
                    date: new Date(item.dateCreated.complete),
                    month: this.FunctionsUtilService.dateMonthToString(item.dateCreated.complete, ZONE),
                    finances: {
                        incomes: totalIncomesFormatted,
                        expenses: totalExpensesFormatted,
                        saving: totalSavingFormatted
                    }
                });
            }

            for(var x in groups) {
                if(Object.prototype.hasOwnProperty.call(groups, x)) {
                    var obj = {};
                    obj[x] = groups[x];
                    result.push(obj);
                }
            }

            return result;
        }

        /*
        * Go to finance detail page
        * @description this method is launched when user press one finance's block
        */
        goToDetail(financeId): void {
            this.$state.go('page.financeDetail',
                           {financeId: financeId});
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.pages.historyPage')
        .controller(HistoryPageController.controllerId, HistoryPageController);

}
