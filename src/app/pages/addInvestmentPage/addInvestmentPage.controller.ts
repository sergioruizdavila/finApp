/**
 * AddInvestmentPageController
 * @description - Add Investment Page Controller
 */

module app.pages.addInvestmentPage {

    export interface IAddInvestmentPageController {
        activate: () => void;
    }

    export interface IAddInvestmentForm {
        investment: app.models.IMoney;
    }

    export class AddInvestmentPageController implements IAddInvestmentPageController {

        static controllerId = 'finApp.pages.addInvestmentPage.AddInvestmentPageController';

        form: IAddInvestmentForm;
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
                investment: {
                    num: null,
                    formatted: ''
                }
            };
            this.activate();
        }

        activate(): void {
            console.log('addInvestmentPage controller actived');
        }

        /*-- METHODS --*/
        goToBack(): void {
            this.$ionicHistory.goBack();
        }

        formatInvestment(): void {
            let currencyObj: app.models.IMoney = this.FunctionsUtilService.formatCurrency(this.form.investment.num, this.form.investment.formatted);

            this.form.investment.num = currencyObj.num;
            this.form.investment.formatted = currencyObj.formatted;
        }
    }

    angular
        .module('finApp.pages.addInvestmentPage')
        .controller(AddInvestmentPageController.controllerId, AddInvestmentPageController);

}
