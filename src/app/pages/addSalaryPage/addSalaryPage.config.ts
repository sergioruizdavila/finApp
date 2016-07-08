/**
* config()
* @description - add salary page config file
*/


(function() {
    'use strict';

    angular
        .module('finApp.pages.addSalaryPage', [])
        .config(config);

    //config.$inject = ['ionic'];

    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.salary', {
                url: '/salary',
                views: {
                    'container': {
                        templateUrl: 'templates/app/pages/addSalaryPage/addSalaryPage.html',
                        controller: 'finApp.pages.addSalaryPage.AddSalaryPageController',
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
                        },
                        callsStack: null
                    }
                },
                cache: false
            });
    }
})();
