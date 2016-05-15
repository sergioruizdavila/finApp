/**
* config()
* @description - add investment page config file
*/


(function() {
    'use strict';

    angular
        .module('finApp.pages.addInvestmentPage', [])
        .config(config);

    //config.$inject = ['ionic'];

    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.investment', {
                url: '/investment',
                views: {
                    'container': {
                        templateUrl: 'templates/app/pages/addInvestmentPage/addInvestmentPage.html',
                        controller: 'finApp.pages.addInvestmentPage.AddInvestmentPageController',
                        controllerAs: 'vm'
                    }
                },
                parent: 'page',
                params: {
                    financeId: null,
                    action: {
                        type: '',
                        data: {
                            num: null,
                            formatted: ''
                        }
                    }
                }
            });
    }
})();
