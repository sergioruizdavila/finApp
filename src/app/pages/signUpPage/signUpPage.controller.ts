/**
 * SignUpPageController
 * @description - Sign up Page Controller
 */

module app.pages.signUpPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ISignUpPageController {
        ref: Firebase;
        form: ISignUpForm;
        user: app.models.User;
        error: ISignUpError;
        signUpDataConfig: ISignUpDataConfig;
        register: () => void;
        goToBack: () => void;
        activate: () => void;
    }

    export interface ISignUpForm {
        email: string;
    }

    export interface ISignUpError {
        message: string;
    }

    export interface ISignUpDataConfig extends ng.ui.IStateParamsService {
        user: app.models.User;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class SignUpPageController implements ISignUpPageController {

        static controllerId = 'finApp.pages.signUpPage.SignUpPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        ref: Firebase;
        form: ISignUpForm;
        user: app.models.User;
        error: ISignUpError;
        signUpDataConfig: ISignUpDataConfig;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = ['$ionicHistory',
            '$ionicPopup',
            '$state',
            '$stateParams',
            'finApp.auth.AuthService',
            '$filter'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $ionicHistory: ionic.navigation.IonicHistoryService,
            private $ionicPopup: ionic.popup.IonicPopupService,
            private $state: ng.ui.IStateService,
            private $stateParams: ISignUpDataConfig,
            private AuthService,
            private $filter) {

            this.init();

        }

        /*-- INITIALIZE METHOD --*/
        private init() {
            //Get state params
            this.signUpDataConfig = this.$stateParams;

            //Init form
            this.form = {
                email: ''
            };
            //TODO: AngularFire no me permite crear un Usuario nuevo sin una password valida
            // Asi que le asignaremos una temporal para poder permitir crear el user. Buscar
            // Una solucion màs optima
            this.user = {
                username: '',
                email: '',
                password: 'finAppTemporalPassword',
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
            console.log('signUpPage controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /*
        * Register Method
        * @description Create new user if current user doesn`t have an account
        */
        register(): void {
            let self = this;
            //CONSTANTS
            const POPUP_TITLE = this.$filter('translate')('%popup.create_user.title.text');
            const POPUP_BODY_TEXT = this.$filter('translate')('%popup.create_user.body_message.text');
            const POPUP_CANCEL_BUTTON_TEXT = this.$filter('translate')('%popup.general.cancel_button.text');
            const POPUP_OK_BUTTON_TEXT = this.$filter('translate')('%popup.create_user.ok_button.text');
            const POPUP_OK_BUTTON_TYPE = 'button-positive';
            /********************/

            let confirmInstance = self.$ionicPopup.show({
                title: POPUP_TITLE,
                template: POPUP_BODY_TEXT,
                buttons: [
                    { text: POPUP_CANCEL_BUTTON_TEXT },
                    {
                        text: POPUP_OK_BUTTON_TEXT,
                        type: POPUP_OK_BUTTON_TYPE,
                        onTap: function(e) {
                            console.log('onTap Button Event: ', e);
                        }
                    }
                ]
            });

            confirmInstance.then(function(res) {
                if (res) {
                    //Si presiona SI, lo deberia llevar a la funcion login()
                    self.$state.go('page.logIn', { user: self.user });
                } else {
                    console.log('You are not sure');
                }
            });

            this.user.email = this.form.email;
            this.AuthService().$createUser(this.user).then(function(user) {
                //TODO: replantear esto ya que deberia primero preguntar, y despues si crear la cuenta
                //toca averiguar como hacer que se intente primero loguear, y si ese email no existe en
                //la base, entonces mostrar el popUp, y preguntar si el usuario quiere crear una nueva cuenta
                //Posible solucion: Buscar en la base si existe ya un usuario con ese mail (recorrer todo el objeto users,
                //y buscar si hay un email igual ya registrado) sino, deberia mostrar el popUp y confirmar la creacion del usuario

                //TODO: Mostrar un popUp diciendo: te crearemos una nueva cuenta: Si o No

                console.log('new user: ', user);
            }, function(error) {
                //Llevar a la pagina de Logging si ese mail ya esta registrado
                if (error.code === 'EMAIL_TAKEN') {
                    self.$state.go('page.logIn', { user: self.user });
                } else {
                    self.error = error;
                }
            });
        };

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
        .module('finApp.pages.signUpPage')
        .controller(SignUpPageController.controllerId, SignUpPageController);

}
