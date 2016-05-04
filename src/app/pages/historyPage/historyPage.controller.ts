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
                          '$rootScope'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private dataConfig: IDataConfig,
                    private FinanceService: app.models.finance.IFinanceService,
                    private FunctionsUtilService: app.core.util.functionsUtil.FunctionsUtilService,
                    private $state: ng.ui.IStateService,
                    private $stateParams: IHistoryDataConfig,
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

        _getTotalIncomes(income): number {
            //VARIABLES
            var incomesToArray = [];
            let total = 0;

            for (let key in income) {
                incomesToArray.push(income[key].num || 0);
            }

            total = this.FinanceService.total(incomesToArray);
            return total;
        }

        _groupByYear(finances): Array<any> {
            //VARIABLES
            var groups = {};
            var result = [];

            for(var i = 0; i < finances.length; i++) {
                var item = finances[i];

                if(!groups[item.dateCreated.year]) {
                    groups[item.dateCreated.year] = [];
                }

                let num = this._getTotalIncomes(item.income);
                let formatted = this.FunctionsUtilService.formatCurrency(num, '');

                groups[item.dateCreated.year].push({
                    month: item.dateCreated.month,
                    finances: {incomes: formatted}
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
