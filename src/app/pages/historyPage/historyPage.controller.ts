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
    }

    export interface IHistoryDataConfig extends ng.ui.IStateParamsService {

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
        financesList: Array<any>;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['dataConfig',
                          'finApp.models.finance.FinanceService',
                          'finApp.core.util.FunctionsUtilService',
                          '$state',
                          '$stateParams',
                          '$filter',
                          '$rootScope'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private dataConfig: IDataConfig,
                    private FinanceService: app.models.finance.IFinanceService,
                    private FunctionsUtilService: app.core.util.functionsUtil.FunctionsUtilService,
                    private $state: ng.ui.IStateService,
                    private $stateParams: IHistoryDataConfig,
                    private $filter: angular.IFilterService,
                    private $rootScope: app.interfaces.IFinAppRootScope) {
            this.init();
        }

        /*-- INITIALIZE METHOD --*/
        private init() {

            this.historyDataConfig = this.$stateParams;

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('historyPage controller actived');
            //VARIABLES
            let self = this;

            //Get All User's finances in order to draw each block
            this._getFinances().then(function(finances:any){
                //grouping by year
                self.financesList = self._groupByYear(finances);
            });
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/
        _getFinances(): angular.IPromise<Array<app.models.finance.Finance>> {
            return this.FinanceService.getAllFinances().then(function(finances){
                return finances;
            });
        }


        _getTotalIncomes(incomes): number {
            //VARIABLES
            var incomesToArray = [];
            let total = 0;

            for (let key in incomes) {
                incomesToArray.push(incomes[key].num || 0);
            }

            total = this.FinanceService.total(incomesToArray);
            return total;
        }


        _getTotalExpenses(expenses): number {
            //VARIABLES
            var expensesToArray = [];
            let total = 0;

            for (let type in expenses) {

                for (let key in expenses[type]) {
                    expensesToArray.push(expenses[type][key].value.num || 0);
                }

            }

            total = this.FinanceService.total(expensesToArray);
            return total;
        }


        _groupByYear(finances): Array<any> {
            //VARIABLES
            var groups = {};
            var result = [];

            for(var i = 0; i < finances.length; i++) {
                //CONSTANTS
                const ZONE = this.$filter('translate')('%global.zone');
                //VARIABLES
                var item = finances[i];
                let totalIncomes = this._getTotalIncomes(item.income);
                let totalIncomesFormatted = this.FunctionsUtilService.formatCurrency(totalIncomes, '');
                let totalExpenses = this._getTotalExpenses(item.typeOfExpense);
                let totalExpensesFormatted = this.FunctionsUtilService.formatCurrency(totalExpenses, '');
                let totalSaving = this.FinanceService.getSaving(totalIncomes, totalExpenses);
                let totalSavingFormatted = this.FunctionsUtilService.formatCurrency(totalSaving, '');

                if(!groups[item.dateCreated.year]) {
                    groups[item.dateCreated.year] = [];
                }

                groups[item.dateCreated.year].push({
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


    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.pages.historyPage')
        .controller(HistoryPageController.controllerId, HistoryPageController);

}
