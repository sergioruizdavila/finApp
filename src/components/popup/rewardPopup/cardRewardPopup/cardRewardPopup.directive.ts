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
        close:() => void;
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
                          'finApp.core.util.FunctionsUtilService'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(public $scope: ICardRewardPopupScope,
                    public $element: Element,
                    private FunctionsUtilService: app.core.util.functionsUtil.FunctionsUtilService) {
            this.init();
        }

        /*-- INITIALIZE METHOD --*/
        private init() {
            this._opened = false;
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
