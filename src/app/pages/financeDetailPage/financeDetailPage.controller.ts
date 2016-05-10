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
            //LOG
            console.log('financeDetailPage controller actived');
            //VARIABLES
            let self = this;

            //Get All User's finances in order to draw each block
            this._getFinanceDetail(this.financeDetailDataConfig.financeId)
            .then(function(finance){
                //grouping by year
                //self._financesList = self._groupByYear(finances);
                console.log(finance);
            });
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
        * _getFinanceDetail
        * @description this method is launched when user press OK button
        */
        _getFinanceDetail(financeId): angular.IPromise<AngularFireObject> {
            return this.FinanceService.getFinanceById(financeId)
            .then(
                function(finance){
                    return finance;
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
        .module('finApp.pages.addBusinessPage')
        .controller(FinanceDetailPageController.controllerId, FinanceDetailPageController);

}
