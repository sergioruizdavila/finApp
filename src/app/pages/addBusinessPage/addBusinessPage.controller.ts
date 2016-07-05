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
        updateValue: () => void;
        goToNext: () => void;
        goToBack: () => void;
    }

    export interface IAddBusinessDataConfig extends ng.ui.IStateParamsService {
        financeId: string;
        action: IActionParams;
    }

    export interface IActionParams {
        type: string;
        data: app.models.finance.IMoney;
    }

    export interface IAddBusinessForm {
        business: app.models.finance.IIncome;
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
                    private $stateParams: IAddBusinessDataConfig,
                    private $rootScope: app.interfaces.IFinAppRootScope,
                    private auth: app.auth.IAuthService) {
                this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //Validate if user is logged in
            this._isLoggedIn();

            this.addBusinessDataConfig = this.$stateParams;

            //Get Finance Position
            this._financePos = this.FunctionsUtilService.getPositionByUid(this.$rootScope.User.Finance,
                                                                          this.addBusinessDataConfig.financeId);

            //Init form
            this.form = {
                business: {
                    value: {
                        num: this.addBusinessDataConfig.action.data.num || null,
                        formatted: this.addBusinessDataConfig.action.data.formatted || ''
                    }
                }
            };

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
        * Format Business Method
        * @description Format the business value with default currency
        */
        private _formatBusiness(): void {
            let currencyObj: app.models.finance.IMoney =
            this.FunctionsUtilService.formatCurrency(this.form.business.value.num,
                                                     this.form.business.value.formatted);

            this.form.business.value.num = currencyObj.num;
            this.form.business.value.formatted = currencyObj.formatted;
        }

        /*
        * Save Business Method
        * @description Save business value on $rootScope's model and on Firebase
        */
        private _saveBusiness(): void {
            //Update User model
            this.$rootScope.User.Finance[this._financePos].Income.Business = this.form.business;

            //Save business on firebase
            this.FinanceService.saveBusiness(
                this.$rootScope.User.Finance[this._financePos].Income.Business,
                this.addBusinessDataConfig.financeId,
                function(err) {
                    if (err) {
                        //LOG
                        console.log('Error: Not saved finance after change Business value');
                    }
                }
            );
        }

        /*
        * Go to necessary expenses page
        * @description this method is launched when user press OK button
        */
        goToNext(): void {
            //Save Business value
            this._saveBusiness();

            this.$state.go('page.necessaryExpense', {
                financeId: this.addBusinessDataConfig.financeId,
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
            //Save Salary value
            this._saveBusiness();

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
        .module('finApp.pages.addBusinessPage')
        .controller(AddBusinessPageController.controllerId, AddBusinessPageController);

}
