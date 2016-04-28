/**
* ListPopupController
* @description - List Popup Directive
* @example - <fa-list-popup></fa-list-popup>
*/

module components.popup.listPopup {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IListPopup extends angular.IDirective {

    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    class FaListPopup implements IListPopup {

        static directiveId = 'faListPopup';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        bindToController: Boolean = true;
        controller = ListPopupController.controllerId;
        controllerAs: string = 'vm';
        restrict: string = 'E';
        templateUrl: string = 'templates/components/popup/listPopup/listPopup.html';
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['dataConfig'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(dataConfig: IDataConfig) {
            console.log('faListPopup directive constructor');
        }

        link($scope: angular.IScope, elm: Element, attr: angular.IAttributes): void {
            console.log('faListPopup link function');
        }

        /*-- INSTANCE FUNCTION --*/
        static instance(dataConfig: IDataConfig): IListPopup {
            return new FaListPopup(dataConfig);
        }
    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.components.faListPopup')
        .directive(FaListPopup.directiveId, FaListPopup.instance);


    /*********************************************************/
    /*                     CONTROLLER                        */
    /*********************************************************/
    /**
    * ListPopupController
    * @description - List Popup Controller
    */

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IListPopupController {
        activate: () => void;
    }

    export interface IListPopupScope extends angular.IScope {
        popupConfig: app.interfaces.IPopup;
        $parent: IListPopupScope;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class ListPopupController implements IListPopupController {

        static controllerId = 'finApp.components.ListPopupController';

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
        constructor(public $scope: IListPopupScope,
                    private FunctionsUtilService: app.core.util.functionsUtil.FunctionsUtilService) {
            this.init();
        }

        /*-- INITIALIZE METHOD --*/
        private init() {
            this.list = this.$scope.$parent.popupConfig.textsList;
            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            console.log('listPopup controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/


    }

    /*-- MODULE DEFINITION --*/
    angular.module('finApp.components.faListPopup')
        .controller(ListPopupController.controllerId, ListPopupController);

}
