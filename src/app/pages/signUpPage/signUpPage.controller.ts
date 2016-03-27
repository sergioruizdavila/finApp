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

    export class SignUpPageController implements ISignUpPageController {

        static controllerId = 'finApp.pages.signUpPage.SignUpPageController';

        form: ISignUpForm;
        user: app.models.User;

        static $inject = ['$ionicHistory'];

        constructor(private $ionicHistory: ionic.navigation.IonicHistoryService) {
            this.init();
        }

        //Init Properties
        private init() {
            //Init form
            this.form = {
                email: ''
            };

            this.activate();
        }

        activate(): void {
            console.log('signUpPage controller actived');
        }

        /*-- METHODS --*/
        goToBack(): void {
            this.$ionicHistory.goBack();
        }

    }

    angular
        .module('finApp.pages.signUpPage')
        .controller(SignUpPageController.controllerId, SignUpPageController);

}
