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
        action: IActionParams;
    }

    export interface IActionParams {
        type: string;
        data: app.models.finance.IMoney;
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
                          'finApp.models.user.UserService',
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
                    private UserService: app.models.user.UserService,
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

            this.addSalaryDataConfig = this.$stateParams;

            //Init form
            this.form = {
                salary: {
                    num: this.addSalaryDataConfig.action.data.num,
                    formatted: this.addSalaryDataConfig.action.data.formatted
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
            let self = this;

            if(!this.auth.isLoggedIn()){
                this.$state.go('page.signUp');
                event.preventDefault();
            } else {
                this.UserService.getUserByUid(this.$rootScope.User.Uid).then(
                    function(userData: any){

                        self.$rootScope.User = new app.models.user.UserFirebase(userData);
                        console.log('Finances Model: ', self.$rootScope.User);
                    }
                );

                // this.FinanceService.getAllFinances().then(
                //     function(finances) {
                //         console.log('Finances from BE: ', finances);
                //         for (let i = 0; i < finances.length; i++) {
                //             let financeInstance = new app.models.finance.Finance(finances[i]);
                //             self.$rootScope.User.addFinance(financeInstance);
                //         }
                //         console.log('Finances Model: ', self.$rootScope.User);
                //     }
                // );
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
        * Update Value method
        * @description this method is launched when user is editing salary value
        */
        updateValue(): void {
            let self = this;
            this.FinanceService.getFinanceById(this.addSalaryDataConfig.financeId)
            .then(
                function(finance: any) {
                    let financeInstance = new app.models.finance.Finance(finance);
                    var elementPos = self.FunctionsUtilService.getPositionByUid(self.$rootScope.User.Finance,
                                                                                self.addSalaryDataConfig.financeId);
                    //Update User model
                    self.$rootScope.User.Finance[elementPos].Income.Salary = self.form.salary;
                    //Update salary on firebase
                    self.FinanceService.saveFinance(self.$rootScope.User.Finance[elementPos]);
                    self.$ionicHistory.goBack();
                }
            );
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
