/**
 * TabsController
 * @description - Dashboard Page Controller
 */

module components.tabs {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ITabsController {
        activate: () => void;
        isSet: (tabId: number) => boolean;
        setTab: (tabId: number) => void;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class TabsController implements ITabsController {

        static controllerId = 'finApp.components.tabs.TabsController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        active: boolean;
        tab: number;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$state'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $state: ng.ui.IStateService) {
            this.init();
        }

        /*-- INITIALIZE METHOD --*/
        private init() {
            this.tab = 1;
            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            console.log('tabs controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/
        isSet(tabId): boolean {
            return this.tab === tabId;
        }

        setTab(tabId): void {
            this.tab = tabId;
        };

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.components.tabs')
        .controller(TabsController.controllerId, TabsController);

}
