/**
* config()
* @description - add necessary expense page config file
*/


(function() {
    'use strict';

    angular
        .module('finApp.pages.addNecessaryExpensePage', [])
        .config(config);

    //config.$inject = ['ionic'];

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
                parent: 'page'
            });
    }
})();
