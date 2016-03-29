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
        user: app.models.User;
        ref: Firebase;
        error: ILogInError;
        logInDataConfig: ILogInDataConfig;
        activate: () => void;
    }

    export interface ILogInForm {
        password: string;
    }

    export interface ILogInError {
        message: string;
    }

    export interface ILogInDataConfig extends ng.ui.IStateParamsService {
        user: app.models.User;
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
        user: app.models.User;
        ref: Firebase;
        error: ILogInError;
        logInDataConfig: ILogInDataConfig;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$ionicHistory',
                          '$state',
                          '$stateParams',
                          'finApp.auth.AuthService'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $ionicHistory: ionic.navigation.IonicHistoryService,
                    private $state: ng.ui.IStateService,
                    private $stateParams: ILogInDataConfig,
                    private AuthService) {

            this.init();

        }

        /*-- INITIALIZE METHOD --*/
        private init() {
            //Get state params
            this.logInDataConfig = this.$stateParams;

            //Init form
            this.form = {
                password: ''
            };

            this.user = {
                username: '',
                email: this.logInDataConfig.user.email,
                password: this.form.password,
                salary: {
                    num: null,
                    formatted: ''
                },
                investment: {
                    num: null,
                    formatted: ''
                },
                business: {
                    num: null,
                    formatted: ''
                }
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
        * @description If current user has an account, it asks a valid password in order to give authorization
        */
        login(): void {
            let self = this;

            this.user.password = this.form.password;
            this.AuthService().$authWithPassword(this.user).then(function (response){
                //TODO: Si se loguea exitosamente debe llevarlo directamente a: 1. addSalaryPage
                // si es la primera vez que usa la App, 2. dashboard o pantalla principal, donde le
                // muestre los meses, las tarejtas, etc etc.
                self.$state.go('page.salary');
                console.log('Response after Auth: ', response);
            }, function (error){
                //TODO: Validar si tiene mal el password, mostrando un mensaje o popUp nativo del dispositivo
                self.error = error;
                console.log('Error after Auth: ', error);
            });

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
