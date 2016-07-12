/**
* config()
* @description - main page config file
*/


(function() {
    'use strict';

    angular
        .module('finApp.pages.main', [])
        .config(config);

    //config.$inject = ['ionic'];

    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page', {
                url: '/page',
                abstract: true,
                cache: false,
                template: '<ion-nav-view name="container"></ion-nav-view>',
                controller: 'finApp.pages.main.MainController',
                controllerAs: 'vm'
            });


    }
})();
