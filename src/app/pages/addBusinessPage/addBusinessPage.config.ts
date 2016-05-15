/**
* config()
* @description - add business page config file
*/

(function() {
    'use strict';

    angular
        .module('finApp.pages.addBusinessPage', [])
        .config(config);

    //config.$inject = ['ionic'];

    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.business', {
                url: '/business',
                views: {
                    'container': {
                        templateUrl: 'templates/app/pages/addBusinessPage/addBusinessPage.html',
                        controller: 'finApp.pages.addBusinessPage.AddBusinessPageController',
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
