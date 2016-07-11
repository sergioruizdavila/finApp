/**
* config()
* @description - cards page config file
*/


(function() {
    'use strict';

    angular
        .module('finApp.pages.cardsPage', [])
        .config(config);

    //config.$inject = ['ionic'];

    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('tabs.cards', {
                url: '/cards',
                views: {
                    'tabs': {
                        templateUrl: 'templates/app/pages/cardsPage/cardsPage.html',
                        controller: 'finApp.pages.cardsPage.CardsPageController',
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
                        draw: '',
                        callsStack: null
                    }
                },
                cache: false
            });
    }
})();
