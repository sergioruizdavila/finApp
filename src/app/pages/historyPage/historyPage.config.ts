/**
* config()
* @description - history page config file
*/

(function() {
    'use strict';

    angular
        .module('finApp.pages.historyPage', [])
        .config(config);

    //config.$inject = ['ionic'];

    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('tabs.history', {
                url: '/history',
                views: {
                    'tabs': {
                        templateUrl: 'templates/app/pages/historyPage/historyPage.html',
                        controller: 'finApp.pages.historyPage.HistoryPageController',
                        controllerAs: 'vm'
                    }
                },
                params: {
                    financeId: null,
                    action: {
                        data: {
                            num: null,
                            formatted: ''
                        },
                        callsStack: null
                    }
                },
                cache: false
            });
    }

})();
