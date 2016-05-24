/**
* config()
* @description - add unnecessary expense page config file
*/


(function() {
    'use strict';

    angular
        .module('finApp.pages.addUnnecessaryExpensePage', [])
        .config(config);

    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.unnecessaryExpense', {
                url: '/unnecessaryExpense',
                views: {
                    'container': {
                        templateUrl: 'templates/app/pages/addUnnecessaryExpensePage/addUnnecessaryExpensePage.html',
                        controller: 'finApp.pages.addUnnecessaryExpensePage.AddUnnecessaryExpensePageController',
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
