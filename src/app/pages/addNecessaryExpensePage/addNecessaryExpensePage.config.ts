/**
* config()
* @description - add necessary expense page config file
*/

(function() {
    'use strict';

    angular
        .module('finApp.pages.addNecessaryExpensePage', [])
        .config(config);

    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.necessaryExpense', {
                url: '/necessaryExpense',
                views: {
                    'container': {
                        templateUrl: 'templates/app/pages/addNecessaryExpensePage/addNecessaryExpensePage.html',
                        controller: 'finApp.pages.addNecessaryExpensePage.AddNecessaryExpensePageController',
                        controllerAs: 'vm'
                    }
                },
                parent: 'page',
                params: {
                    financeId: null,
                    action: {
                        type: 'Edit',
                        data: {
                            total: {num: null, formatted: ''}
                        }
                    }
                },
                cache: false
            });
    }
})();
