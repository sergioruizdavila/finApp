/**
 * module() Here inject dependencies of App modules and components, such as controllers, service, directive, etc
 * config() Here define the main state, routes, http interceptor
 *
 * @param {angular.ui.IUrlRouterProvider} $urlRouterProvider
 * @return {void}
 */

(function (): void {
    'use strict';

    angular
        .module('finApp', [
            /*dependencies of App modules (i.e. controllers, services, etc)*/
            'finApp.core',
            'finApp.pages.main',
            'finApp.pages.tutorialPage'

        ])
        .config(config);

    function config($urlRouterProvider: angular.ui.IUrlRouterProvider) {
        $urlRouterProvider.otherwise('/page/tutorial');
    }

})();
