/**
* config()
* @description - profile page config file
*/


(function() {
    'use strict';

    angular
        .module('finApp.pages.profilePage', [])
        .config(config);

    //config.$inject = ['ionic'];

    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('tabs.profile', {
                url: '/profile',
                views: {
                    'tabs': {
                        templateUrl: 'templates/app/pages/profilePage/profilePage.html',
                        controller: 'finApp.pages.profilePage.ProfilePageController',
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();
