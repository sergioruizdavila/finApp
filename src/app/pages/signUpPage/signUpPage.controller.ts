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
        error: ISignUpError;
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
        error: ISignUpError;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = ['$ionicHistory',
            '$ionicPopup',
            '$state',
            'finApp.auth.AuthService',
            '$filter',
            'finApp.models.user.UserService',
            '$scope',
            '$rootScope'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $ionicHistory: ionic.navigation.IonicHistoryService,
            private $ionicPopup: ionic.popup.IonicPopupService,
            private $state: ng.ui.IStateService,
            private AuthService,
            private $filter: angular.IFilterService,
            private UserService: app.models.user.IUserService,
            private $scope: angular.IScope,
            private $rootScope: app.interfaces.IFinAppRootScope) {

            this.init();

        }

        /*-- INITIALIZE METHOD --*/
        private init() {

            //Init form
            this.form = {
                email: ''
            };

            this.error = {
                message: ''
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
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

            //Save new email in User object
            this.$rootScope.User.Email = this.form.email;

            //Validate if the email already exist on database
            this.UserService.existUserByEmail(this.$rootScope.User.Email).then(function(isExist){

                //user exist in database
                if (isExist) {
                    self.$state.go('page.logIn');
                } else {
                    /*  Show popUp in order to warn the user that if he/she doesn't have account,
                        we are going to create new one */
                    self.$ionicPopup.show({
                        title: POPUP_TITLE,
                        template: POPUP_BODY_TEXT,
                        buttons: [
                            { text: POPUP_CANCEL_BUTTON_TEXT },
                            {
                                text: POPUP_OK_BUTTON_TEXT,
                                type: POPUP_OK_BUTTON_TYPE,
                                onTap: function(e) {
                                    self._createAccount(e);
                                }
                            }
                        ]
                    });
                }
            });

        };

        /*
        * Create Account
        * @description Create Account on FireBase
        */
        _createAccount(event): void {
            //LOG
            console.log('onTap Button Event: ', event);
            //VARIABLES
            let self = this;
            let currentDataUser = {
                email: this.$rootScope.User.Email,
                password: 'temporalPassword'
            };
            let auth = self.AuthService.getRef();

            //Create Account on Firebase Accounting System
            auth.$createUser(currentDataUser).then(function(user) {
                //LOG
                console.log('created new user in FireBase Auth System: ', user);
                //Authenticate user
                self._authWithPassword(auth, currentDataUser);

            }, function(error) {

                if (error.code === 'EMAIL_TAKEN') {
                    console.log('this user already has an account');
                    self.$state.go('page.logIn');
                } else {
                    self.error = error;
                }
            });
        }

        /*
        * authWithPassword
        * @description Authenticated User with password method
        */
        _authWithPassword(authRef, user): void {
            let self = this;
            /*  After created successfully account, authenticates the client using
                email / password combination */
            authRef.$authWithPassword(user).then(
                function (authData){
                    //LOG
                    console.log('Authenticated successfully with payload:', authData);
                    //Add provider property
                    self.$rootScope.User.Uid = authData.uid;
                    self.$rootScope.User.Provider = authData.provider;
                    //Create new User in dataBase and make three binding ways
                    self.UserService.createUser(self.$rootScope.User, function(err){
                        if (err) {
                            //LOG
                            console.log('Error: Not created user');
                        } else {
                            self.$state.go('page.salary');
                        }
                    });

                }, function (error){
                    self.error = error;
                    //LOG
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
        .module('finApp.pages.signUpPage')
        .controller(SignUpPageController.controllerId, SignUpPageController);

}


/* -- IMPORTANT NOTE -- */
//Bindea el 'user' con la vista y la base de datos
/*this.$scope.user = new app.models.User();
var _this = this;
this.User.getUserByEmail('sergioruizdavila22').$bindTo(this.$scope, 'user').then(function(){
    _this.$scope.user.username = 'Pablo Pedro';
});*/
