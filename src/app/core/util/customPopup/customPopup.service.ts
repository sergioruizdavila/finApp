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
        invokeCustomPopup: (popupConfig: IPopupConfig) => void;
    }

    export interface IPopupConfig {
        scope: any;
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
        * invokeCustomPopup
        * @description - invoke custom popUp
        * @use - this.customPopup.invokeCustomPopup(popupConfigObject);
        * @function
        * @params {any} popupConfig - popupConfig data
        */
        invokeCustomPopup(popupConfig): void {
            var element = document.createElement("fa-card-reward-popup");
            document.body.appendChild(element);
            this.$compile(element)(popupConfig.scope);
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
    .module('finApp.core.util', [])
    .service(CustomPopupService.serviceId, CustomPopupService);

}
