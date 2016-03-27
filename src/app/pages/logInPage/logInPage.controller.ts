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

    export class LogInPageController implements ILogInPageController {

        static controllerId = 'finApp.pages.logInPage.LogInPageController';

        form: ILogInForm;
        user: app.models.User;

        static $inject = ['$ionicHistory'];

        constructor(private $ionicHistory: ionic.navigation.IonicHistoryService) {
            this.init();
        }

        //Init Properties
        private init() {
            //Init form
            this.form = {
                password: ''
            };

            this.activate();
        }

        activate(): void {
            console.log('logInPage controller actived');
        }

        /*-- METHODS --*/
        goToBack(): void {
            this.$ionicHistory.goBack();
        }

    }

    angular
        .module('finApp.pages.logInPage')
        .controller(LogInPageController.controllerId, LogInPageController);

}
