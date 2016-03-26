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
        salary: ISalary;
    }

    export interface ISalary {
        num: number;
        formatted: string;
    }

    export class AddSalaryPageController implements IAddSalaryPageController {

        static controllerId = 'finApp.pages.addSalaryPage.AddSalaryPageController';

        form: IAddSalaryForm;
        user: app.models.User;
        value: string;
        valueWithoutFormat: number;

        static $inject = ['$ionicHistory'];

        constructor(private $ionicHistory: ionic.navigation.IonicHistoryService) {
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
            this.value = '';
            this.valueWithoutFormat = null;

            this.activate();
        }

        activate(): void {
            console.log('addSalaryPage controller actived');
        }

        /*-- METHODS --*/
        goToBack(): void {
            this.$ionicHistory.goBack();
        }

        formatCurrency(): void {

            if(this.form.salary.formatted){
                this.form.salary.num = accounting.unformat(this.form.salary.formatted);
            }

            this.form.salary.formatted = accounting.formatMoney(this.form.salary.num, '$', 0);
        }

    }

    angular
        .module('finApp.pages.addSalaryPage')
        .controller(AddSalaryPageController.controllerId, AddSalaryPageController);

}
