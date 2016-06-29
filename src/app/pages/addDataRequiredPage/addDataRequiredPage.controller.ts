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
        goToNext: () => void;
        goToBack: () => void;
    }

    export interface IAddDataRequiredDataConfig extends ng.ui.IStateParamsService {
        formula: app.models.formula.Formula;
    }

    export interface IAddDataRequiredForm {

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
        private _financePos: number;
        private _testClass: boolean;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$filter',
                          '$ionicPopup',
                          '$ionicHistory',
                          '$state',
                          '$stateParams',
                          '$rootScope',
                          'finApp.auth.AuthService',
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
                    private management: app.core.util.ManagementFunctionsService) {
                this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //Validate if user is logged in
            this._isLoggedIn();

            this.addDataRequiredDataConfig = this.$stateParams;

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

        /*
        * Go to necessary expenses page
        * @description this method is launched when user press OK button
        */
        goToNext(): void {

        }

        /*
        * Go to back method
        * @description this method is launched when user press back button
        */
        goToBack(): void {
            this.$ionicHistory.goBack();
        }

        //TODO: Refactor this method
        testClick(): void {
            this._testClass = this._testClass ? false : true;
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.pages.addDataRequiredPage')
        .controller(AddDataRequiredPageController.controllerId, AddDataRequiredPageController);

}
