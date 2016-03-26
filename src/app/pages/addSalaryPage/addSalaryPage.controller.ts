/**
 * AddSalaryPageController
 * @description - Add Salary Page Controller
 */

module app.pages.addSalaryPage {

    export interface IAddSalaryPageController {
        user: app.models.User;
        activate: () => void;
    }

    export interface IAddSalaryForm {
        salary: app.models.IMoney;
    }

    export class AddSalaryPageController implements IAddSalaryPageController {

        static controllerId = 'finApp.pages.addSalaryPage.AddSalaryPageController';

        form: IAddSalaryForm;
        user: app.models.User;

        static $inject = ['$ionicHistory', 'finApp.core.util.FunctionsUtilService'];

        constructor(private $ionicHistory: ionic.navigation.IonicHistoryService,
                    private FunctionsUtilService: app.core.util.functionsUtil.FunctionsUtilService) {
            this.init();
        }

        //Init Properties
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

        activate(): void {
            console.log('addSalaryPage controller actived');
        }

        /*-- METHODS --*/
        goToBack(): void {
            this.$ionicHistory.goBack();
        }

        formatSalary(): void {
            let currencyObj: app.models.IMoney =
            this.FunctionsUtilService.formatCurrency(this.form.salary.num, this.form.salary.formatted);
            this.form.salary.num = currencyObj.num;
            this.form.salary.formatted = currencyObj.formatted;
        }

    }

    angular
        .module('finApp.pages.addSalaryPage')
        .controller(AddSalaryPageController.controllerId, AddSalaryPageController);

}
