/**
 * addDataRequiredPageController
 * @description - Add Data Required Page Controller
 */

module app.pages.addDataRequiredPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IAddDataRequiredPageController {
        form: IAddDataRequiredForm;
        activate: () => void;
        updateValue: () => void;
        goToNext: () => void;
        goToBack: () => void;
    }

    export interface IAddDataRequiredDataConfig extends ng.ui.IStateParamsService {
        financeId: string;
        action: IActionParams;
    }

    export interface IActionParams {
        type: string;
        data: app.models.finance.IMoney;
    }

    export interface IAddDataRequiredForm {
        business: app.models.finance.IMoney;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class AddDataRequiredPageController implements IAddDataRequiredPageController {

        static controllerId = 'finApp.pages.addDataRequiredPage.AddDataRequiredPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IAddDataRequiredForm;
        addDataRequiredDataConfig: IAddDataRequiredDataConfig;
        private _financePos: number;
        private _testClass: boolean;
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
                    private $stateParams: IAddDataRequiredDataConfig,
                    private $rootScope: app.interfaces.IFinAppRootScope,
                    private auth: app.auth.IAuthService) {
                this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //Validate if user is logged in
            this._isLoggedIn();

            this.addDataRequiredDataConfig = this.$stateParams;

            //Get Finance Position
            this._financePos = this.FunctionsUtilService.getPositionByUid(this.$rootScope.User.Finance,
                                                                          this.addDataRequiredDataConfig.financeId);

            //Init form
            this.form = {
                business: {
                    num: this.addDataRequiredDataConfig.action.data.num || null,
                    formatted: this.addDataRequiredDataConfig.action.data.formatted || ''
                }
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            console.log('addDataRequiredPage controller actived');
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
        * Format Data Required Method
        * @description Format the business value with default currency
        */
        private _formatDataRequired(): void {
            let currencyObj: app.models.finance.IMoney =
            this.FunctionsUtilService.formatCurrency(this.form.business.num,
                                                     this.form.business.formatted);

            this.form.business.num = currencyObj.num;
            this.form.business.formatted = currencyObj.formatted;
        }

        /*
        * Save Data Required Method
        * @description Save business value on $rootScope's model and on Firebase
        */
        private _saveDataRequired(): void {
            //Update User model
            this.$rootScope.User.Finance[this._financePos].Income.Business = this.form.business;
            //Save salary on firebase
            this.FinanceService.saveFinance(
                this.$rootScope.User.Finance[this._financePos],
                function(err) {
                    if (err) {
                        //LOG
                        console.log('Error: Not saved finance after change Data Required value');
                    }
                }
            );
        }

        /*
        * Go to necessary expenses page
        * @description this method is launched when user press OK button
        */
        goToNext(): void {
            //Save Data Required value
            this._saveDataRequired();

            this.$state.go('page.necessaryExpense', {
                financeId: this.addDataRequiredDataConfig.financeId,
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
            this._saveDataRequired();

            this.$ionicHistory.goBack();
        }

        /*
        * Go to back method
        * @description this method is launched when user press back button
        */
        goToBack(): void {
            this.$ionicHistory.goBack();
        }

        testClick(): void {
            this._testClass = this._testClass ? false : true;
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.pages.addDataRequiredPage')
        .controller(AddDataRequiredPageController.controllerId, AddDataRequiredPageController);

}
