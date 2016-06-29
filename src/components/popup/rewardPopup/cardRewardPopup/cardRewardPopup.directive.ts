/**
* CardRewardPopupController
* @description - Card Reward Popup Directive
* @example - <fa-card-reward-popup></fa-card-reward-popup>
*/

module components.popup.rewardPopup.cardRewardPopup {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ICardRewardPopup extends angular.IDirective {

    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    class FaCardRewardPopup implements ICardRewardPopup {

        static directiveId = 'faCardRewardPopup';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        bindToController: Boolean = true;
        controller = CardRewardPopupController.controllerId;
        controllerAs: string = 'vm';
        restrict: string = 'E';
        templateUrl: string = 'templates/components/popup/rewardPopup/cardRewardPopup/cardRewardPopup.html';
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['dataConfig'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(dataConfig: IDataConfig) {
            console.log('faCardRewardPopup directive constructor');
        }

        link($scope: angular.IScope, elm: Element, attr: angular.IAttributes): void {
            console.log('faCardRewardPopup link function');
        }

        /*-- INSTANCE FUNCTION --*/
        static instance(dataConfig: IDataConfig): ICardRewardPopup {
            return new FaCardRewardPopup(dataConfig);
        }
    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.components.rewardPopup.faCardPopup')
        .directive(FaCardRewardPopup.directiveId, FaCardRewardPopup.instance);


    /*********************************************************/
    /*                     CONTROLLER                        */
    /*********************************************************/
    /**
    * CardRewardPopupController
    * @description - Card Reward Popup Controller
    */

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ICardRewardPopupController {
        activate: () => void;
        showTipPopup: () => void;
        useCard: () => void;
        close: () => void;
    }

    export interface ICardRewardPopupScope extends angular.IScope {
        popupConfig: app.interfaces.IPopup;
        $parent: ICardRewardPopupScope;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class CardRewardPopupController implements ICardRewardPopupController {

        static controllerId = 'finApp.components.CardRewardPopupController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        list: Array<string>;
        private _opened: boolean;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$scope',
                          '$element',
                          '$filter',
                          '$state',
                          '$ionicPopup',
                          '$cordovaNativeAudio',
                          'finApp.models.formula.FormulaService',
                          'finApp.core.util.FunctionsUtilService'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(public $scope: ICardRewardPopupScope,
                    public $element: Element,
                    private $filter: angular.IFilterService,
                    private $state: ng.ui.IStateService,
                    private $ionicPopup: ionic.popup.IonicPopupService,
                    private $cordovaNativeAudio: any,
                    private FormulaService: app.models.formula.FormulaService,
                    private FunctionsUtilService: app.core.util.functionsUtil.FunctionsUtilService) {
            this.init();
        }

        /*-- INITIALIZE METHOD --*/
        private init() {
            this._opened = false;
            /*TODO: Uncomment when we will deploy to device
            if(this.$scope.popupConfig.withPack){
                this.$cordovaNativeAudio.play('win');
            } */
            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            console.log('CardRewardPopup controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /*
        * Show card reward tip popup
        * @description - this method is launched when user press Gift icon in order
        * to receive more information
        */
        showTipPopup(): void {
            //VARIABLES
            let self = this;
            //CONSTANTS
            const POPUP_TITLE = this.$filter('translate')('%popup.tip.card.title.text');
            const POPUP_BODY_TEXT = this.$filter('translate')('%popup.tip.card.body_message.text');
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
        * useCard
        * @description - this method is launched when user press USE button in order
        * to use a card.
        */
        useCard(): void {
            //VARIABLES
            let self = this;
            //CONSTANTS
            const POPUP_TITLE = this.$filter('translate')('%popup.use_card.title.text');
            const POPUP_BODY_TEXT = this.$filter('translate')('%popup.use_card.body_message.text');
            const POPUP_CANCEL_BUTTON_TEXT = this.$filter('translate')('%popup.use_card.cancel_button.text');
            const POPUP_OK_BUTTON_TEXT = this.$filter('translate')('%popup.use_card.ok_button.text');
            const POPUP_OK_BUTTON_TYPE = 'button-positive';
            /********************/

            this.$ionicPopup.show({
                title: POPUP_TITLE,
                template: POPUP_BODY_TEXT,
                buttons: [
                    { text: POPUP_CANCEL_BUTTON_TEXT },
                    {
                        text: POPUP_OK_BUTTON_TEXT,
                        type: POPUP_OK_BUTTON_TYPE,
                        onTap: function(e) {
                            let formulaId = self.$scope.popupConfig.cardData.FormulaId;
                            self.FormulaService.getFormulaById(formulaId).then(
                                function(formula: app.models.formula.Formula) {
                                    self.$state.go('page.dataRequired', {
                                        formula: formula
                                    });
                                    self.close();
                                }
                            );

                        }
                    }
                ]
            });
        }


        /*
        * open Pack
        * @description - this method is launched when user press pack,
        * and active slideOutDown animation
        */
        openPack(): void {
            this._opened = true;
        }


        /*
        * close Popup
        * @description this method is launched when user press X button
        */
        close(): void {
            this.$scope.$destroy();
            this.$element.remove();
        }

    }

    /*-- MODULE DEFINITION --*/
    angular.module('finApp.components.rewardPopup.faCardPopup')
        .controller(CardRewardPopupController.controllerId, CardRewardPopupController);

}
