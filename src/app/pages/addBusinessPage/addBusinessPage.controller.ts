/**
 * AddBusinessPageController
 * @description - Add Business Page Controller
 */

module app.pages.addBusinessPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IAddBusinessPageController {
        form: IAddBusinessForm;
        activate: () => void;
        goToNext: () => void;
        goToBack: () => void;
    }

    export interface IAddBusinessDataConfig extends ng.ui.IStateParamsService {
        financeId: string;
    }

    export interface IAddBusinessForm {
        business: app.models.finance.IMoney;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class AddBusinessPageController implements IAddBusinessPageController {

        static controllerId = 'finApp.pages.addBusinessPage.AddBusinessPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IAddBusinessForm;
        addBusinessDataConfig: IAddBusinessDataConfig;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['dataConfig',
                          '$ionicHistory',
                          'finApp.models.finance.FinanceService',
                          'finApp.core.util.FunctionsUtilService',
                          '$state',
                          '$stateParams',
                          '$rootScope'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private dataConfig: IDataConfig,
                    private $ionicHistory: ionic.navigation.IonicHistoryService,
                    private FinanceService: app.models.finance.IFinanceService,
                    private FunctionsUtilService: app.core.util.functionsUtil.FunctionsUtilService,
                    private $state: ng.ui.IStateService,
                    private $stateParams: IAddBusinessDataConfig,
                    private $rootScope: app.interfaces.IFinAppRootScope) {
                this.init();
        }

        /*-- INITIALIZE METHOD --*/
        private init() {
            //Init form
            this.form = {
                business: { num: null, formatted: '' }
            };

            this.addBusinessDataConfig = this.$stateParams;

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            console.log('addBusinessPage controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /*
        * Format Business Method
        * @description Format the business value with default currency
        */
        _formatBusiness(): void {
            let currencyObj: app.models.finance.IMoney =
            this.FunctionsUtilService.formatCurrency(this.form.business.num,
                                                     this.form.business.formatted);

            this.form.business.num = currencyObj.num;
            this.form.business.formatted = currencyObj.formatted;
        }

        /*
        * Go to necessary expenses page
        * @description this method is launched when user press OK button
        */
        goToNext(): void {
            //Get elementPos by Uid
            var elementPos = this.FunctionsUtilService.getPositionByUid(this.$rootScope.User.Finance,
                                                                        this.addBusinessDataConfig.financeId);

            //Update User model
            this.$rootScope.User.Finance[elementPos].Income.Business = this.form.business;
            //Save salary on firebase
            this.FinanceService.saveFinance(this.$rootScope.User.Finance[elementPos]);

            this.$state.go('page.necessaryExpense', {financeId: this.addBusinessDataConfig.financeId});
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
        .controller(AddBusinessPageController.controllerId, AddBusinessPageController);

}
