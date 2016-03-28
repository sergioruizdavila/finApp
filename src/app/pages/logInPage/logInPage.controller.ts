/**
 * SignUpPageController
 * @description - Log In Page Controller (Page where app asks about password or logIn with Facebook)
 */

module app.pages.logInPage {

    export interface ILogInPageController {
        activate: () => void;
    }

    export interface ILogInForm {
        password: string;
    }

    export interface ILogInDataConfig extends ng.ui.IStateParamsService {
        user: app.models.User;
    }

    export class LogInPageController implements ILogInPageController {

        static controllerId = 'finApp.pages.logInPage.LogInPageController';

        form: ILogInForm;
        user: app.models.User;
        ref: Firebase;
        logInDataConfig: ILogInDataConfig;

        static $inject = ['$ionicHistory',
                            '$firebaseAuth',
                            'finApp.core.firebase.FirebaseFactory',
                            '$state',
                            '$stateParams'];

        constructor(private $ionicHistory: ionic.navigation.IonicHistoryService,
                    private $firebaseAuth: AngularFireAuthService,
                    private FirebaseFactory: app.core.firebase.FirebaseFactory,
                    private $state: ng.ui.IStateService,
                    private $stateParams: ILogInDataConfig) {

            this.init();

        }

        //Init Properties
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

            this.activate();
        }

        activate(): void {
            console.log('logInPage controller actived');
        }

        /*-- METHODS --*/

        login(): void {
            this.user.password = this.form.password;
            let self = this;
            this.ref = this.FirebaseFactory.createFirebase();
            let auth = this.$firebaseAuth(this.ref);

            auth.$authWithPassword(this.user).then(function (response){
                //TODO: Si se loguea exitosamente debe llevarlo directamente a: 1. addSalaryPage
                // si es la primera vez que usa la App, 2. dashboard o pantalla principal, donde le
                // muestre los meses, las tarejtas, etc etc.
                self.$state.go('page.salary');
                console.log('Response after Auth: ', response);
            }, function (error){
                //TODO: Validar si tiene mal el password, mostrando un mensaje o popUp nativo del dispositivo

                console.log('Error after Auth: ', error);
            });

        }

        goToBack(): void {
            this.$ionicHistory.goBack();
        }

    }

    angular
        .module('finApp.pages.logInPage')
        .controller(LogInPageController.controllerId, LogInPageController);

}
