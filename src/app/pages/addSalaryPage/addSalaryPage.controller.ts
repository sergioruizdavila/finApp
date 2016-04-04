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
        formatSalary: () => void;
        activate: () => void;
        goToNext: () => void;
        goToBack: () => void;
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
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$ionicHistory',
                          'finApp.core.util.FunctionsUtilService',
                          '$state',
                          '$rootScope'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $ionicHistory: ionic.navigation.IonicHistoryService,
                    private FunctionsUtilService: app.core.util.functionsUtil.FunctionsUtilService,
                    private $state: ng.ui.IStateService,
                    private $rootScope: app.interfaces.IFinAppRootScope) {
            this.init();
        }

        /*-- INITIALIZE METHOD --*/
        private init() {
            //Init form
            this.form = {
                salary: {
                    num: null,
                    formatted: ''
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
        * Format Salary Method
        * @description Format the salary value with default currency
        */
        formatSalary(): void {
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
            this.$rootScope.User.Finance.Salary = this.form.salary;
            this.$state.go('page.investment');
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
