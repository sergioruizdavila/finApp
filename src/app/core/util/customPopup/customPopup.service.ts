/**
* customPopupService
* @description - Service invoke custom Popup
* @constructor
*/

module app.core.util.customPopup {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ICustomPopupService {
        invokeCardRewardPopup: (scope: any, popupConfig: app.interfaces.IPopup) => void;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class CustomPopupService implements ICustomPopupService {

        static serviceId = 'finApp.core.util.CustomPopupService';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/

        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$compile'];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $compile: angular.ICompileService) {
            console.log('customPopup service called');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/


        /**
        * invokeCardRewardPopup
        * @description - invoke Card Reward popUp
        * @use - this.customPopup.invokeCardRewardPopup(scope);
        * @function
        * @params {any} scope - parent scope
        * @params {app.interfaces.IPopup} popupConfig - popup config data
        */
        invokeCardRewardPopup(scope, popupConfig): void {
            scope.cardRewardScope = scope.$new();
            scope.cardRewardScope.popupConfig = popupConfig;
            var element = document.createElement("fa-card-reward-popup");
            document.body.appendChild(element);
            this.$compile(element)(scope.cardRewardScope);
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
    .module('finApp.core.util', [])
    .service(CustomPopupService.serviceId, CustomPopupService);

}
