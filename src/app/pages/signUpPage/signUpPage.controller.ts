/**
 * SignUpPageController
 * @description - Sign up Page Controller
 */

module app.pages.signUpPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ISignUpPageController {
        form: ISignUpForm;
        error: ISignUpError;
        signIn: () => void;
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
            private auth,
            private $filter: angular.IFilterService,
            private UserService: app.models.user.IUserService,
            private $scope: angular.IScope,
            private $rootScope: app.interfaces.IFinAppRootScope) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //Validate if user is logged in
            this._isLoggedIn();

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
        * Register Method
        * @description Create new user if current user doesn`t have an account
        */
        signIn(): void {

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
        private _createAccount(event): void {
            //VARIABLES
            let self = this;
            let currentDataUser: app.interfaces.IUserDataAuth = {
                email: this.$rootScope.User.Email,
                password: '1234'
            };

            this.auth.signUpPassword(currentDataUser).then(
                function(response) {
                    //Authenticate user
                    self._authWithPassword(auth, currentDataUser);
                }
            );
        }

        /*
        * authWithPassword
        * @description Authenticated User with password method
        */
        private _authWithPassword(authRef, user): void {
            let self = this;
            /*  After created successfully account, authenticates the client using
                email / password combination */
            this.auth.logInPassword(user).then(
                function(response){
                    //Add provider property
                    self.$rootScope.User.Uid = response.uid;
                    self.$rootScope.User.Provider = response.provider;
                    //Create new User in dataBase and make three binding ways
                    self.UserService.createNewUser(self.$rootScope.User, function(err){
                        if (err) {
                            //LOG
                            console.log('Error: Not created user');
                        } else {
                            //Create User Finance object
                            let newFinance = new app.models.finance.Finance();
                            self.$rootScope.User.addFinance(newFinance);
                            self.$state.go('page.salary', {
                                financeId: newFinance.Uid,
                                action: {
                                    type: 'Add',
                                    data: {
                                        num: null,
                                        formatted: ''
                                    }
                                }
                            });
                        }
                    });
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
