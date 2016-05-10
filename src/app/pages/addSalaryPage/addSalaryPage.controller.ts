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
        goToNext: () => void;
        goToBack: () => void;
    }

    export interface IAddSalaryDataConfig extends ng.ui.IStateParamsService {
        financeId: string;
    }

    export interface IAddSalaryForm {
        salary: app.models.finance.IMoney;
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
        addSalaryDataConfig: IAddSalaryDataConfig;
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
                    private $stateParams: IAddSalaryDataConfig,
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
                salary: { num: null, formatted: '' }
            };

            this.addSalaryDataConfig = this.$stateParams;

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
            this.FunctionsUtilService.formatCurrency(this.form.salary.num,
                                                     this.form.salary.formatted);
            this.form.salary.num = currencyObj.num;
            this.form.salary.formatted = currencyObj.formatted;
        }

        /*
        * Go to investment page
        * @description this method is launched when user press OK button
        */
        goToNext(): void {
            //Get elementPos by Uid
            var elementPos = this.FunctionsUtilService.getPositionByUid(this.$rootScope.User.Finance,
                                                                        this.addSalaryDataConfig.financeId);

            //Update User model
            this.$rootScope.User.Finance[elementPos].Income.Salary = this.form.salary;
            //Save salary on firebase
            this.FinanceService.saveFinance(this.$rootScope.User.Finance[elementPos]);

            this.$state.go('page.investment', {financeId: this.addSalaryDataConfig.financeId});
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
