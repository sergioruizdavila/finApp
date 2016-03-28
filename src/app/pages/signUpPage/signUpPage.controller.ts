/**
 * SignUpPageController
 * @description - Sign up Page Controller
 */

module app.pages.signUpPage {

    export interface ISignUpPageController {
        activate: () => void;
    }

    export interface ISignUpForm {
        email: string;
    }

    export interface ISignUpDataConfig extends ng.ui.IStateParamsService {
        user: app.models.User;
    }

    export class SignUpPageController implements ISignUpPageController {

        static controllerId = 'finApp.pages.signUpPage.SignUpPageController';

        ref: Firebase;
        form: ISignUpForm;
        user: app.models.User;
        signUpDataConfig: ISignUpDataConfig;

        static $inject = ['$ionicHistory',
                            '$firebaseAuth',
                            'finApp.core.firebase.FirebaseFactory',
                            '$state',
                            '$stateParams'];

        constructor(private $ionicHistory: ionic.navigation.IonicHistoryService,
                    private $firebaseAuth: AngularFireAuthService,
                    private FirebaseFactory: app.core.firebase.FirebaseFactory,
                    private $state: ng.ui.IStateService,
                    private $stateParams: ISignUpDataConfig) {
            this.init();
        }

        //Init Properties
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

            this.activate();
        }

        activate(): void {
            console.log('signUpPage controller actived');
        }

        /*-- METHODS --*/

        register(): void {
            //let auth = this.AuthService.createAuth();
            this.user.email = this.form.email;
            let self = this;
            this.ref = this.FirebaseFactory.createFirebase();
            let auth = this.$firebaseAuth(this.ref);
            auth.$createUser(this.user).then(function (user){
                //TODO: Mostrar un popUp diciendo: te crearemos una nueva cuenta: Si o No
                //Si presiona SI, lo deberia llevar a la funcion login()
                console.log('new user: ', user);
            }, function (error){
                //Llevar a la pagina de Logging si ese mail ya esta registrado
                if (error.code === 'EMAIL_TAKEN') {
                    self.$state.go('page.logIn', { user: self.user});
                }
            });
        };

        goToBack(): void {
            this.$ionicHistory.goBack();
        }

    }

    angular
        .module('finApp.pages.signUpPage')
        .controller(SignUpPageController.controllerId, SignUpPageController);

}
