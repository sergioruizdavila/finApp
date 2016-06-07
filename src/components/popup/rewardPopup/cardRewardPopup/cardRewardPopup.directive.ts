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
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$scope', 'finApp.core.util.FunctionsUtilService'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(public $scope: ICardRewardPopupScope,
                    private FunctionsUtilService: app.core.util.functionsUtil.FunctionsUtilService) {
            this.init();
        }

        /*-- INITIALIZE METHOD --*/
        private init() {
            
            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            console.log('CardRewardPopup controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/


    }

    /*-- MODULE DEFINITION --*/
    angular.module('finApp.components.rewardPopup.faCardPopup')
        .controller(CardRewardPopupController.controllerId, CardRewardPopupController);

}
