/**
* config()
* @description - user's finance detail page config file
*/


(function() {
    'use strict';

    angular
        .module('finApp.pages.financeDetailPage', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.financeDetail', {
                url: '/financeDetail',
                views: {
                    'container': {
                        templateUrl: 'templates/app/pages/financeDetailPage/financeDetailPage.html',
                        controller: 'finApp.pages.financeDetailPage.FinanceDetailPageController',
                        controllerAs: 'vm'
                    }
                },
                parent: 'page',
                params: {
                    financeId: null
                }
            });
    }
})();
