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
        formatBusiness: () => void;
        goToNext: () => void;
        goToBack: () => void;
        activate: () => void;
    }

    export interface IAddBusinessForm {
        business: app.models.finance.IMoney;
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
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$ionicHistory',
                            'finApp.core.util.FunctionsUtilService',
                            'finApp.models.finance.FinanceService',
                            '$state',
                            '$rootScope'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $ionicHistory: ionic.navigation.IonicHistoryService,
        private FunctionsUtilService: app.core.util.functionsUtil.FunctionsUtilService,
        private FinanceService: app.models.finance.IFinanceService,
        private $state: ng.ui.IStateService,
        private $rootScope: app.interfaces.IFinAppRootScope) {
            this.init();
        }

        /*-- INITIALIZE METHOD --*/
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

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            console.log('addBusinessPage controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /*
        * Format Business Method
        * @description Format the business value with default currency
        */
        formatBusiness(): void {
            let currencyObj: app.models.finance.IMoney =
            this.FunctionsUtilService.formatCurrency(this.form.business.num,
                                                     this.form.business.formatted);

            this.form.business.num = currencyObj.num;
            this.form.business.formatted = currencyObj.formatted;
        }

        /*
        * Go to necessary expenses page
        * @description this method is launched when user press OK button
        */
        goToNext(): void {
            //Update User model
            this.$rootScope.User.Finance.Income.Business = this.form.business;
            //Save business on firebase
            // TODO: Esta funcion se puede reutilizar mucho (ya que es la misma funcion para todo Income)
            // Analizar la forma màs optima de llamar a esta funcion sin tener que estarle mandando
            // tantos parametros.
            this.FinanceService.saveIncome(this.$rootScope.User.Id,
                                                 'business',
                                                 this.$rootScope.User.Finance.Income.Business);
            this.$state.go('page.necessaryExpense');
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
