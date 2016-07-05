/**
 * addDataRequiredPageController
 * @description - Add Data Required Page Controller
 */

module app.pages.addDataRequiredPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IAddDataRequiredPageController {
        form: IAddDataRequiredForm;
        activate: () => void;
        showDataRequiredTipPopup: () => void;
        showMissingDataTipPopup: () => void;
        showDataUpdateTipPopup: () => void;
        checkDataUpdate: ($index: number, data: Array<IDataRequired>) => void;
        goToNext: () => void;
        goToBack: () => void;
    }

    export interface IAddDataRequiredDataConfig extends ng.ui.IStateParamsService {
        financeId: string;
        formula: app.models.formula.Formula;
    }

    export interface IAddDataRequiredForm {

    }

    export interface IDataRequired {
        title: string;
        route: string;
        update?: boolean;
        value?: app.models.finance.IMoney;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class AddDataRequiredPageController implements IAddDataRequiredPageController {

        static controllerId = 'finApp.pages.addDataRequiredPage.AddDataRequiredPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IAddDataRequiredForm;
        addDataRequiredDataConfig: IAddDataRequiredDataConfig;
        private _missingDataList: Array<IDataRequired>;
        private _dataUpdateList: Array<IDataRequired>;
        private _financePos: number;
        private _checked: Array<boolean>;
        private _dataToUpdate: Array<IDataRequired>;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$filter',
                          '$ionicPopup',
                          '$ionicHistory',
                          '$state',
                          '$stateParams',
                          '$rootScope',
                          'finApp.auth.AuthService',
                          'finApp.models.dataGroup.DataGroupService',
                          'finApp.core.util.FunctionsUtilService',
                          'finApp.core.util.ManagementFunctionsService'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $filter: angular.IFilterService,
                    private $ionicPopup: ionic.popup.IonicPopupService,
                    private $ionicHistory: ionic.navigation.IonicHistoryService,
                    private $state: ng.ui.IStateService,
                    private $stateParams: IAddDataRequiredDataConfig,
                    private $rootScope: app.interfaces.IFinAppRootScope,
                    private auth: app.auth.IAuthService,
                    private DataGroupService: app.models.dataGroup.DataGroupService,
                    private FunctionsUtilService: app.core.util.functionsUtil.FunctionsUtilService,
                    private management: app.core.util.ManagementFunctionsService) {
                this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //Validate if user is logged in
            this._isLoggedIn();

            //Init VARIABLES
            this._missingDataList = [];
            this._dataUpdateList = [];
            this._dataToUpdate = [];
            this._checked = [];

            this.addDataRequiredDataConfig = this.$stateParams;

            //Get Finance Position
            //TODO: VALIDAR SI NO ENCUENTRA LA POSICION
            this._financePos = this.FunctionsUtilService.getPositionByUid(this.$rootScope.User.Finance,
                                                                          '12af9dd9-c1ec-48f1-b70d-9e7b6a37da27');

            let variables = this.addDataRequiredDataConfig.formula.Variable;
            for (let i = 0; i < variables.length; i++) {
                let userData = this.$rootScope.User.Finance[this._financePos][variables[i].group];
                this._buildDataList(userData, variables[i].group, variables[i].member);
            }

            //TODO: Aqui deberia tomar el objeto formula que me envian de cardRewardPopup
            // Y dibujar dinamicamente el formulario
            console.log('Llego la data de cardRewardPopup: ', this.addDataRequiredDataConfig.formula);

            //TODO: TEST remove when it is not neccesary
            var income:app.models.dataGroup.EnumDataGroup = app.models.dataGroup.EnumDataGroup.income;

            console.log('Ya tengo el uid de income, para obtener sus miembros:', income);

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            console.log('addDataRequiredPage controller actived');
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
        * Show data required tip popup
        * @description - this method is launched when user press Gift icon in order
        * to receive more information about this page
        */
        showDataRequiredTipPopup(): void {
            //VARIABLES
            let self = this;
            //CONSTANTS
            const POPUP_TITLE = this.$filter('translate')('%popup.tip.data_required.main.title.text');
            const POPUP_BODY_TEXT = this.$filter('translate')('%popup.tip.data_required.main.body_message.text');
            const POPUP_OK_BUTTON_TEXT = this.$filter('translate')('%popup.tip.example.ok_button.text');
            const POPUP_OK_BUTTON_TYPE = 'button-positive';
            /********************/

            this.$ionicPopup.show({
                title: POPUP_TITLE,
                template: POPUP_BODY_TEXT,
                buttons: [
                    {
                        text: POPUP_OK_BUTTON_TEXT,
                        type: POPUP_OK_BUTTON_TYPE
                    }
                ]
            });

        };

        /*
        * Show missing data tip popup
        * @description - this method is launched when user press Gift icon in order
        * to receive more information about missing data
        */
        showMissingDataTipPopup(): void {
            //VARIABLES
            let self = this;
            //CONSTANTS
            const POPUP_TITLE = this.$filter('translate')('%popup.tip.data_required.missing_data.title.text');
            const POPUP_BODY_TEXT = this.$filter('translate')('%popup.tip.data_required.missing_data.body_message.text');
            const POPUP_OK_BUTTON_TEXT = this.$filter('translate')('%popup.tip.example.ok_button.text');
            const POPUP_OK_BUTTON_TYPE = 'button-positive';
            /********************/

            this.$ionicPopup.show({
                title: POPUP_TITLE,
                template: POPUP_BODY_TEXT,
                buttons: [
                    {
                        text: POPUP_OK_BUTTON_TEXT,
                        type: POPUP_OK_BUTTON_TYPE
                    }
                ]
            });

        };

        /*
        * Show data update tip popup
        * @description - this method is launched when user press Gift icon in order
        * to receive more information about data update
        */
        showDataUpdateTipPopup(): void {
            //VARIABLES
            let self = this;
            //CONSTANTS
            const POPUP_TITLE = this.$filter('translate')('%popup.tip.data_required.data_update.title.text');
            const POPUP_BODY_TEXT = this.$filter('translate')('%popup.tip.data_required.data_update.body_message.text');
            const POPUP_OK_BUTTON_TEXT = this.$filter('translate')('%popup.tip.example.ok_button.text');
            const POPUP_OK_BUTTON_TYPE = 'button-positive';
            /********************/

            this.$ionicPopup.show({
                title: POPUP_TITLE,
                template: POPUP_BODY_TEXT,
                buttons: [
                    {
                        text: POPUP_OK_BUTTON_TEXT,
                        type: POPUP_OK_BUTTON_TYPE
                    }
                ]
            });

        };

        private _buildDataList(userData: any, group: string, member: string): void {
            let formattedData = this._formatData(member);

            if(userData) {
                if(userData[member]){
                    //Get value and adding it on Data Update List
                    formattedData.value = userData[member].value;
                    this._dataUpdateList.push(formattedData);

                } else {
                    //Adding formattedData on Missing Data List
                    this._missingDataList.push(formattedData);
                }
            } else {
                //Adding formattedData on Missing Data List
                this._missingDataList.push(formattedData);
            }
        }

        /**
        * _formatData
        * @description - format data in order to include on data update list or
        * missing data list
        * @function
        * @params {string} member
        * @return {IDataRequired} formattedData
        */
        private _formatData(member: string): IDataRequired {
            //VARIABLES
            let formattedData: IDataRequired = {title: '', route: ''};
            //CONSTANTS
            const SALARY = 'Salario';
            const SALARY_ROUTE = 'page.salary';
            const INVESTMENT = 'Inversión';
            const INVESTMENT_ROUTE = 'page.investment';
            const BUSINESS = 'Negocios';
            const BUSINESS_ROUTE = 'page.business';
            const NECESSARIES = 'Gastos Necesarios';
            const NECESSARIES_ROUTE = 'page.necessaryExpense';
            const UNNECESSARIES = 'Gastos Innecesarios';
            const UNNECESSARIES_ROUTE = 'page.unnecessaryExpense';

            switch(member) {
                case 'salary':
                    formattedData.title =  SALARY;
                    formattedData.route = SALARY_ROUTE;
                break;
                case 'investment':
                    formattedData.title = INVESTMENT;
                    formattedData.route = INVESTMENT_ROUTE;
                break;
                case 'business':
                    formattedData.title = BUSINESS;
                    formattedData.route = BUSINESS_ROUTE;
                break;
                case 'necessaries':
                    formattedData.title = NECESSARIES;
                    formattedData.route = NECESSARIES_ROUTE;
                break;
                case 'unnecessaries':
                    formattedData.title = UNNECESSARIES;
                    formattedData.route = UNNECESSARIES_ROUTE;
                case 'goal':
                    formattedData.title = 'Meta Proxima';
                    formattedData.route = 'page.goal';
                break;
            }

            return formattedData;
        }

        private _buildCallsStack(): Array<IDataRequired> {
            let result = [];
            let missingData = this._missingDataList;
            let dataUpdate = this._dataUpdateList;

            for (let i = 0; i < dataUpdate.length; i++) {
                if(dataUpdate[i].update){
                    result.push(dataUpdate[i]);
                }
            }

            result = result.concat(missingData);

            return result;
        }

        /*
        * Go to necessary expenses page
        * @description this method is launched when user press OK button
        */
        goToNext(): void {
            //Build callsStack array
            let callsStack: Array<IDataRequired> = this._buildCallsStack();
            //TODO: Revisar bien aqui ya que funciona para salary, business y investment
            // pero no va a funcionar con Expenses ya que la propiedad action.data tiene un
            // 'total', asi que toca ver si funcionaria o es necesario agregar algo.
            this.$state.go(callsStack[0].route, {
                financeId: '12af9dd9-c1ec-48f1-b70d-9e7b6a37da27',
                action: {
                    type: 'Edit',
                    data: callsStack[0].value
                }
            });
        }

        checkDataUpdate($index, data): void {
            if(this._checked[$index]){
                this._checked[$index] = false;
                this._dataUpdateList[$index].update = false;
            } else {
                this._checked[$index] = true;
                this._dataUpdateList[$index].update = true;
            }
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
        .module('finApp.pages.addDataRequiredPage')
        .controller(AddDataRequiredPageController.controllerId, AddDataRequiredPageController);

}
