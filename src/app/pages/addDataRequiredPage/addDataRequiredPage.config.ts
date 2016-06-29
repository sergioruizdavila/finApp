/**
* config()
* @description - add data required page config file
*/

(function() {
    'use strict';

    angular
        .module('finApp.pages.addDataRequiredPage', [])
        .config(config);

    //config.$inject = ['ionic'];

    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.dataRequired', {
                url: '/dataRequired',
                views: {
                    'container': {
                        templateUrl: 'templates/app/pages/addDataRequiredPage/addDataRequiredPage.html',
                        controller: 'finApp.pages.addDataRequiredPage.AddDataRequiredPageController',
                        controllerAs: 'vm'
                    }
                },
                parent: 'page',
                params: {
                    formula: null
                },
                cache: false
            });
    }
})();
