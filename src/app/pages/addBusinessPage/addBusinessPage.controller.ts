/**
 * AddBusinessPageController
 * @description - Add Business Page Controller
 */

module app.pages.addBusinessPage {

    export interface IAddBusinessPageController {
        activate: () => void;
    }

    export interface IAddBusinessForm {
        business: app.models.IMoney;
    }

    export class AddBusinessPageController implements IAddBusinessPageController {

        static controllerId = 'finApp.pages.addBusinessPage.AddBusinessPageController';

        form: IAddBusinessForm;
        user: app.models.User;

        static $inject = ['$ionicHistory',
                            'finApp.core.util.FunctionsUtilService'];

        constructor(private $ionicHistory: ionic.navigation.IonicHistoryService,
        private FunctionsUtilService: app.core.util.functionsUtil.FunctionsUtilService) {
            this.init();
        }

        //Init Properties
        private init() {
            //Init form
            this.form = {
                business: {
                    num: null,
                    formatted: ''
                }
            };
            this.activate();
        }

        activate(): void {
            console.log('addBusinessPage controller actived');
        }

        /*-- METHODS --*/
        goToBack(): void {
            this.$ionicHistory.goBack();
        }

        formatBusiness(): void {
            let currencyObj: app.models.IMoney =
            this.FunctionsUtilService.formatCurrency(this.form.business.num, this.form.business.formatted);

            this.form.business.num = currencyObj.num;
            this.form.business.formatted = currencyObj.formatted;
        }

    }

    angular
        .module('finApp.pages.addBusinessPage')
        .controller(AddBusinessPageController.controllerId, AddBusinessPageController);

}
