/**
* config()
* @description - tutorial page config file
*/


(function() {
    'use strict';

    angular
        .module('finApp.pages.tutorialPage', [])
        .config(config);

    //config.$inject = ['ionic'];

    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.tutorial', {
                url: '/tutorial',
                views: {
                    'container': {
                        templateUrl: 'templates/app/pages/tutorialPage/tutorialPage.html',
                        controller: 'finApp.pages.tutorialPage.TutorialPageController',
                        controllerAs: 'vm'
                    }
                },
                parent: 'page'
            });
    }
})();
