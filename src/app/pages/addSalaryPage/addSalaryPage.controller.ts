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
        updateValue: () => void;
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
        private _financePos: number;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        /*TODO: Remover CustomPopupService y GiveRewardService sino se va a usar*/
        static $inject = ['dataConfig',
                          '$ionicHistory',
                          'finApp.models.finance.FinanceService',
                          'finApp.core.util.FunctionsUtilService',
                          'finApp.core.util.CustomPopupService',
                          'finApp.core.util.GiveRewardService',
                          '$state',
                          '$stateParams',
                          '$rootScope',
                          'finApp.auth.AuthService'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        /*TODO: Remover CustomPopupService y GiveRewardService sino se va a usar*/
        constructor(private dataConfig: IDataConfig,
                    private $ionicHistory: ionic.navigation.IonicHistoryService,
                    private FinanceService: app.models.finance.IFinanceService,
                    private FunctionsUtilService: app.core.util.functionsUtil.FunctionsUtilService,
                    private customPopup: app.core.util.customPopup.CustomPopupService,
                    private GiveRewardService: app.core.util.giveReward.GiveRewardService,
                    private $state: ng.ui.IStateService,
                    private $stateParams: IAddSalaryDataConfig,
                    private $rootScope: app.interfaces.IFinAppRootScope,
                    private auth: app.auth.IAuthService) {
            this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //Validate if user is logged in
            this._isLoggedIn();

            this.addSalaryDataConfig = this.$stateParams;

            //Get Finance Position
            this._financePos = this.FunctionsUtilService.getPositionByUid(this.$rootScope.User.Finance,
                                                                          this.addSalaryDataConfig.financeId);

            //Init form
            this.form = {
                salary: {
                    num: this.addSalaryDataConfig.action.data.num || null,
                    formatted: this.addSalaryDataConfig.action.data.formatted || ''
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
        * Save Salary Method
        * @description Save salary value on $rootScope's model and on Firebase
        */
        private _saveSalary(): void {
            //Update User model
            this.$rootScope.User.Finance[this._financePos].Income.Salary = this.form.salary;
            //TODO: IMPORTANT, Analizar si es mejor actualizar cada valor, ya que actualizar
            // todo el objeto User es un gran lio, ya que tendriamos que hacer una function
            // que mantenga los key en los array para que no se pierdan. Hasta el momento,
            // los unicos valores que estan actualizando todo el objeto User son: salary,
            // investment y business, de resto gastos, firstTime se actualizan solo estas
            // propiedades

            //Save salary on firebase
            this.FinanceService.saveFinance(
                this.$rootScope.User.Finance[this._financePos],
                function(err) {
                    if (err) {
                        //LOG
                        console.log('Error: Not saved finance after change Salary value');
                    }
                }
            );
        }

        /*
        * Go to investment page
        * @description this method is launched when user press OK button
        */
        goToNext(): void {
            //Save Salary value
            this._saveSalary();

            this.$state.go('page.investment', {
                financeId: this.addSalaryDataConfig.financeId,
                action: {
                    type: '',
                    data: {num: null, formatted: ''}
                }
            });
        }

        /*
        * Update Value method
        * @description this method is launched when user is editing salary value
        */
        updateValue(): void {
            //Save Salary value
            this._saveSalary();

            this.$ionicHistory.goBack();
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
