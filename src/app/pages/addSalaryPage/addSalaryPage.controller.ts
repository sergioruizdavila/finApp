/**
 * AddSalaryPageController
 * @description - Add Salary Page Controller
 */

module app.pages.addSalaryPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IAddSalaryPageController {
        form: IAddSalaryForm;
        activate: () => void;
        progress: () => Object;
        updateValue: () => void;
        goToNext: () => void;
        goToBack: () => void;
    }

    export interface IAddSalaryForm {
        salary: app.models.finance.IIncome;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class AddSalaryPageController implements IAddSalaryPageController {

        static controllerId = 'finApp.pages.addSalaryPage.AddSalaryPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IAddSalaryForm;
        addSalaryDataConfig: app.interfaces.IDataConfig;
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

            this.addSalaryDataConfig = this.$stateParams;

            //Get Finance Position
            this._financePos = this.FunctionsUtilService.getPositionByUid(this.$rootScope.User.Finance,
                                                                          this.addSalaryDataConfig.financeId);

            //Init form
            this.form = {
                salary: {
                    value: {
                        num: this.addSalaryDataConfig.action.data.num || null,
                        formatted: this.addSalaryDataConfig.action.data.formatted || ''
                    }
                }
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            console.log('addSalaryPage controller actived');
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
        * Format Salary Method
        * @description Format the salary value with default currency
        */
        private _formatSalary(): void {
            let currencyObj: app.models.finance.IMoney =
            this.FunctionsUtilService.formatCurrency(this.form.salary.value.num,
                                                     this.form.salary.value.formatted);
            this.form.salary.value.num = currencyObj.num;
            this.form.salary.value.formatted = currencyObj.formatted;
        }

        /*
        * Save Salary Method
        * @description Save salary value on $rootScope's model and on Firebase
        */
        private _saveSalary(): void {
            //Update User model
            this.$rootScope.User.Finance[this._financePos].Income.Salary = this.form.salary;

            //Save salary on firebase
            this.FinanceService.saveSalary(
                this.$rootScope.User.Finance[this._financePos].Income.Salary,
                this.addSalaryDataConfig.financeId,
                function(err) {
                    if (err) {
                        //LOG
                        console.log('Error: Not saved finance after change Salary value');
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
            let callsStack = this.addSalaryDataConfig.action.callsStack;
            let currentPos = this.addSalaryDataConfig.action.posOnCallsStack;
            let percent = (100 / callsStack.length) * (currentPos + 1);
            return {width: percent + '%'};
        }

        /*
        * Go to next page on calls stack
        * @description this method is launched when user press OK button
        */
        goToNext(): void {
            // VARIABLES
            let currentCall = this.addSalaryDataConfig.action.posOnCallsStack;
            let nextCall = this.addSalaryDataConfig.action.posOnCallsStack + 1;
            let data = this.addSalaryDataConfig.action.callsStack.length > 0 ? this.addSalaryDataConfig.action.callsStack[nextCall].value : {num: null, formatted: ''};

            // Save Salary value
            this._saveSalary();

            // DataConfig object
            let dataConfigObj: app.interfaces.IDataConfig =
            {
                financeId: this.addSalaryDataConfig.financeId,
                action: {
                    type: this.addSalaryDataConfig.action.type,
                    data: data,
                    callsStack: this.addSalaryDataConfig.action.callsStack,
                    posOnCallsStack: nextCall
                }
            };

            // Go to next page on calls stack
            this.$state.go(this.addSalaryDataConfig.action.callsStack[dataConfigObj.action.posOnCallsStack].route, dataConfigObj);
        }

        /*
        * Update Value method
        * @description this method is launched when user is editing salary value
        */
        updateValue(): void {
            //Save Salary value
            this._saveSalary();

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
        .module('finApp.pages.addSalaryPage')
        .controller(AddSalaryPageController.controllerId, AddSalaryPageController);

}
