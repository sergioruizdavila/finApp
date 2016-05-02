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
        ref: Firebase;
        error: ILogInError;
        activate: () => void;
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
        ref: Firebase;
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
                    private AuthService,
                    private $rootScope: app.interfaces.IFinAppRootScope) {

            this.init();

        }

        /*-- INITIALIZE METHOD --*/
        private init() {
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
        * Login Method
        * @description If current user has an account, it asks a valid password
        *              in order to give authorization
        */
        login(): void {
            let self = this;

            //Create temporal User object with email and password data
            let currentDataUser = {
                email: this.$rootScope.User.Email,
                password: this.form.password
            };
            this.AuthService.getRef().$authWithPassword(currentDataUser).then(
                function (authData){
                    //TODO: Si se loguea exitosamente debe llevarlo directamente a: 1. addSalaryPage
                    // si es la primera vez que usa la App, 2. dashboard o pantalla principal, donde le
                    // muestre los meses, las tarjetas, etc etc.
                    self.$rootScope.User.Uid = authData.uid;
                    //TODO: Revisar muy bien este tema, por que no deberia crear otro elemento Finance
                    // para el array de Finances, ya que el usuario deberia editar una finanza nueva
                    //Create User Finance object
                    let newFinance = self.$rootScope.User.setFinance(new app.models.finance.Finance());
                    self.$state.go('page.salary', {financeId: newFinance.Uid});
                    console.log('Authenticated successfully with payload:', authData);
                }, function (error){
                    //TODO: Validar si tiene mal el password, mostrando un mensaje o popUp nativo del dispositivo
                    self.error = error;
                    console.log('Login Failed!', error);
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
