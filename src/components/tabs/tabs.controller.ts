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
        static $inject = ['$state',
                          'finApp.auth.AuthService',
                          '$rootScope'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $state: ng.ui.IStateService,
                    private auth: app.auth.IAuthService,
                    private $rootScope: app.interfaces.IFinAppRootScope) {
            this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //Validate if user is logged in
            this._isLoggedIn();

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

        /*
        * Is Logged In Method
        * @description Validate if user is logged in.
        */
        _isLoggedIn(): void {
            if(!this.auth.isLoggedIn()){
                this.$state.go('page.signUp');
                event.preventDefault();
            } else {
                //Get User's Uid
                let uid = this.getUserUid();
                this.$rootScope.User.Uid = uid;
            }
        }

        /*
        * getUserUid Method
        * @description - Return user Authenticated Uid
        * @return {string} userAuth.uid - User authenticated Uid
        */
        getUserUid(): string {
            let userAuth = this.auth.getUserAuthData();
            return userAuth.uid;
        }

        /*
        * isSet Method
        * @description - Return true if the tab selected is the current tab
        * @params {number} - tab Id selected
        * @return {boolean} - if this tab is equal to tab Id selected, return true
        */
        isSet(tabId): boolean {
            return this.tab === tabId;
        }

        /*
        * setTab Method
        * @description - Assign the tab selected like a current tab
        * @params {number} - tab Id selected
        * @return {void}
        */
        setTab(tabId): void {
            this.tab = tabId;
        };

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.components.tabs')
        .controller(TabsController.controllerId, TabsController);

}
