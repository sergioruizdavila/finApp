/**
* config()
* @description - tabs config file
*/


(function() {
    'use strict';

    angular
        .module('finApp.components.tabs', [])
        .config(config);

    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('tabs', {
                url: '/tabs',
                views: {
                    'container': {
                        templateUrl: 'templates/components/tabs/tabs.html',
                        controller: 'finApp.components.tabs.TabsController',
                        controllerAs: 'vm'
                    }
                },
                parent: 'page',
                params: {
                    financeId: null,
                    action: {
                        data: {
                            num: null,
                            formatted: ''
                        },
                        draw: '',
                        callsStack: null
                    }
                },
                abstract: true
            });
    }
})();
