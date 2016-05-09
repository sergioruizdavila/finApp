/**
 * FinanceDetailPageController
 * @description - Finance Detail Page Controller
 */

module app.pages.financeDetailPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IFinanceDetailPageController {
        activate: () => void;
        saveChanges: () => void;
        goToBack: () => void;
    }

    export interface IFinanceDetailDataConfig extends ng.ui.IStateParamsService {
        financeId: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class FinanceDetailPageController implements IFinanceDetailPageController {

        static controllerId = 'finApp.pages.financeDetailPage.FinanceDetailPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        financeDetailDataConfig: IFinanceDetailDataConfig;
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
                    private $stateParams: IFinanceDetailDataConfig,
                    private $rootScope: app.interfaces.IFinAppRootScope,
                    private auth: any) {
                this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //Validate if user is logged in
            this._isLoggedIn();

            this.financeDetailDataConfig = this.$stateParams;

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            console.log('financeDetailPage controller actived');
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
        * Go to necessary expenses page
        * @description this method is launched when user press OK button
        */
        saveChanges(): void {
            //TODO: Analizar, ya que no serviria de nada un boton guardar, ya que
            // en cada pagina de editar un campo al dar click en el boton Continuar
            // ya guardo los cambios, asi que este boton no tendria utilidad.
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
        .controller(FinanceDetailPageController.controllerId, FinanceDetailPageController);

}
