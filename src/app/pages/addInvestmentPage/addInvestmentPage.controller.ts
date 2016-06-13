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
        updateValue: () => void;
        goToNext: () => void;
        goToBack: () => void;
    }

    export interface IAddInvestmentDataConfig extends ng.ui.IStateParamsService {
        financeId: string;
        action: IActionParams;
    }

    export interface IActionParams {
        type: string;
        data: app.models.finance.IMoney;
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
        private _financePos: number;
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

            this.addInvestmentDataConfig = this.$stateParams;

            //Get Finance Position
            this._financePos = this.FunctionsUtilService.getPositionByUid(this.$rootScope.User.Finance,
                                                                          this.addInvestmentDataConfig.financeId);

            //Init form
            this.form = {
                investment: {
                    num: this.addInvestmentDataConfig.action.data.num || null,
                    formatted: this.addInvestmentDataConfig.action.data.formatted || ''
                }
            };

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
        * Save Investment Method
        * @description Save investment value on $rootScope's model and on Firebase
        */
        private _saveInvestment(): void {
            //Update User model
            this.$rootScope.User.Finance[this._financePos].Income.Investment = this.form.investment;
            //Save investment on firebase
            this.FinanceService.saveFinance(
                this.$rootScope.User.Finance[this._financePos],
                function(err) {
                    if (err) {
                        //LOG
                        console.log('Error: Not saved finance after change Investment value');
                    }
                }
            );
        }

        /*
        * Go to business page
        * @description this method is launched when user press OK button
        */
        goToNext(): void {
            //Save Investment value
            this._saveInvestment();

            this.$state.go('page.business', {
                financeId: this.addInvestmentDataConfig.financeId,
                action: {
                    type: '',
                    data: {total: {num: null, formatted: ''} }
                }
            });
        }

        /*
        * Update Value method
        * @description this method is launched when user is editing salary value
        */
        updateValue(): void {
            //Save Investment value
            this._saveInvestment();

            this.$ionicHistory.goBack();
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
