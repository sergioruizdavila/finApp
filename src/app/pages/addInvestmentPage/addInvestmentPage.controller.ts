/**
 * AddInvestmentPageController
 * @description - Add Investment Page Controller
 */

module app.pages.addInvestmentPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IAddInvestmentPageController {
        form: IAddInvestmentForm;
        activate: () => void;
        goToNext: () => void;
        goToBack: () => void;
    }

    export interface IAddInvestmentDataConfig extends ng.ui.IStateParamsService {
        financeId: string;
    }

    export interface IAddInvestmentForm {
        investment: app.models.finance.IMoney;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class AddInvestmentPageController implements IAddInvestmentPageController {

        static controllerId = 'finApp.pages.addInvestmentPage.AddInvestmentPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IAddInvestmentForm;
        addInvestmentDataConfig: IAddInvestmentDataConfig;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['dataConfig',
                          '$ionicHistory',
                          'finApp.models.finance.FinanceService',
                          'finApp.core.util.FunctionsUtilService',
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
        private $state: ng.ui.IStateService,
        private $stateParams: IAddInvestmentDataConfig,
        private $rootScope: app.interfaces.IFinAppRootScope,
        private auth: any) {
            this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //Validate if user is logged in
            this._isLoggedIn();

            //Init form
            this.form = {
                investment: { num: null, formatted: '' }
            };

            this.addInvestmentDataConfig = this.$stateParams;

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            console.log('addInvestmentPage controller actived');
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
        * Format Investment Method
        * @description Format the investment value with default currency
        */
        private _formatInvestment(): void {
            let currencyObj: app.models.finance.IMoney =
            this.FunctionsUtilService.formatCurrency(this.form.investment.num,
                                                     this.form.investment.formatted);

            this.form.investment.num = currencyObj.num;
            this.form.investment.formatted = currencyObj.formatted;
        }

        /*
        * Go to business page
        * @description this method is launched when user press OK button
        */
        goToNext(): void {

            //Get elementPos by Uid
            var elementPos = this.FunctionsUtilService.getPositionByUid(this.$rootScope.User.Finance,
                                                                        this.addInvestmentDataConfig.financeId);

            //Update User model
            this.$rootScope.User.Finance[elementPos].Income.Investment = this.form.investment;
            //Save salary on firebase
            this.FinanceService.saveFinance(this.$rootScope.User.Finance[elementPos]);

            this.$state.go('page.business', {financeId: this.addInvestmentDataConfig.financeId});
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
        .controller(AddInvestmentPageController.controllerId, AddInvestmentPageController);

}
