/**
 * module() Here inject dependencies of App modules and components, such as controllers, service, directive, etc
 * config() Here define the main state, routes, http interceptor
 *
 * @param {ng.ILocationProvider} $locationProvider
 * @param {angular.ui.IUrlRouterProvider} $urlRouterProvider
 * @param {angular.ui.IStateProvider} $stateProvider
 * @return {void}
 */

(function (): void {
    'use strict';

    angular
        .module('finApp', [
            /*dependencies of App modules (i.e. controllers, services, etc)*/
            'finApp.core',
            'finApp.pages.tutorialPage'

        ])
        .config(config);

    function config() {}

})();
