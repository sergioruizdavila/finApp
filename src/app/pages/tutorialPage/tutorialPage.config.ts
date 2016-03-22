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

        //angular-ui-router for multiple views
        $stateProvider
            .state('page.tutorialPage', {
                url: '/tutorial',
                views: {
                    'container@': {
                        templateUrl: 'templates/app/pages/tutorialPage/tutorialPage.html',
                        controller: 'finApp.pages.tutorialPage.TutorialPageController',
                        controllerAs: 'vm'
                    }
                },
                data: {
                    displayName: 'Tutorial',
                    title : 'Tutorial'
                }
            });
    }
})();
