/**
 * SignUpPageController
 * @description - Log In Page Controller (Page where app asks about password or logIn with Facebook)
 */

module app.pages.logInPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ILogInPageController {
        form: ILogInForm;
        error: ILogInError;
        activate: () => void;
        logIn: () => void;
        goToBack: () => void;
    }

    export interface ILogInForm {
        password: string;
    }

    export interface ILogInError {
        message: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class LogInPageController implements ILogInPageController {

        static controllerId = 'finApp.pages.logInPage.LogInPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: ILogInForm;
        error: ILogInError;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$ionicHistory',
                          '$state',
                          'finApp.auth.AuthService',
                          '$rootScope'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $ionicHistory: ionic.navigation.IonicHistoryService,
                    private $state: ng.ui.IStateService,
                    private auth,
                    private $rootScope: app.interfaces.IFinAppRootScope) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //Validate if user is logged in
            this._isLoggedIn();

            //Init form
            this.form = {
                password: ''
            };

            this.error = {
                message: ''
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            console.log('logInPage controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /*
        * Is Logged In Method
        * @description Validate if user is logged in.
        */
        private _isLoggedIn(): void {
            if(this.auth.isLoggedIn()){
                this.$state.go('tabs.history');
                event.preventDefault();
            }
        }

        /*
        * Login Method
        * @description If current user has an account, it asks a valid password
        *              in order to give authorization
        */
        logIn(): void {
            let self = this;

            //Create temporal User object with email and password data
            let currentDataUser: app.interfaces.IUserDataAuth = {
                email: this.$rootScope.User.Email,
                password: this.form.password
            };

            this.auth.logInPassword(currentDataUser).then(
                function(response){
                    //TODO: implementar mostrar el error cuando response sea error
                    self.$rootScope.User.Uid = response.uid;
                    let newFinance = self.$rootScope.User.setFinance(new app.models.finance.Finance());
                    self.$state.go('tabs.history');
                    console.log('Authenticated successfully with payload:', response);
                }
            );

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
        .module('finApp.pages.logInPage')
        .controller(LogInPageController.controllerId, LogInPageController);

}
