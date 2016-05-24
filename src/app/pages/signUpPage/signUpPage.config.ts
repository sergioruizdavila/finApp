/**
* config()
* @description - sign up page config file
*/


(function() {
    'use strict';

    angular
        .module('finApp.pages.signUpPage', [])
        .config(config);

    //config.$inject = ['ionic'];

    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.signUp', {
                url: '/signUp',
                views: {
                    'container': {
                        templateUrl: 'templates/app/pages/signUpPage/signUpPage.html',
                        controller: 'finApp.pages.signUpPage.SignUpPageController',
                        controllerAs: 'vm'
                    }
                },
                params: {
                    user: null
                },
                parent: 'page'
            });
    }
})();
