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
        progress: () => Object;
        updateValue: () => void;
        goToNext: () => void;
        goToBack: () => void;
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
        addBusinessDataConfig: app.interfaces.IDataConfig;
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
                    private $stateParams: app.interfaces.IDataConfig,
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
                        num: this.addBusinessDataConfig.action.data.num || 0,
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
        * progress
        * @description take callsStack and figuring the progress on stack
        * in order to draw the progress bar on view.
        */
        progress(): Object {
            // VARIABLES
            let callsStack = this.addBusinessDataConfig.action.callsStack;
            let currentPos = this.addBusinessDataConfig.action.posOnCallsStack;
            let percent = (100 / callsStack.length) * (currentPos + 1);
            return {width: percent + '%'};
        }

        /*
        * Go to next page on calls stack
        * @description this method is launched when user press OK button
        */
        goToNext(): void {
            // VARIABLES
            let currentCall = this.addBusinessDataConfig.action.posOnCallsStack;
            let nextCall = this.addBusinessDataConfig.action.posOnCallsStack + 1;
            let data = this.addBusinessDataConfig.action.callsStack.length > 0 ? this.addBusinessDataConfig.action.callsStack[nextCall].value : {num: null, formatted: ''};

            // Save Business value
            this._saveBusiness();

            // DataConfig object
            let dataConfigObj: app.interfaces.IDataConfig =
            {
                financeId: this.addBusinessDataConfig.financeId,
                action: {
                    type: this.addBusinessDataConfig.action.type,
                    data: data,
                    callsStack: this.addBusinessDataConfig.action.callsStack,
                    posOnCallsStack: nextCall
                }
            };

            // Go to next page on calls stack
            this.$state.go(this.addBusinessDataConfig.action.callsStack[dataConfigObj.action.posOnCallsStack].route, dataConfigObj);
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
