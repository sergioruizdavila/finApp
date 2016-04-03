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
            'finApp.core',
            'finApp.core.util',
            'finApp.core.firebase',
            'finApp.auth',
            'finApp.pages.main',
            'finApp.pages.tutorialPage',
            'finApp.pages.signUpPage',
            'finApp.pages.logInPage',
            'finApp.pages.addSalaryPage',
            'finApp.pages.addInvestmentPage',
            'finApp.pages.addBusinessPage',
            'finApp.models.user'
        ])
        .config(config);

    function config($urlRouterProvider: angular.ui.IUrlRouterProvider,
                    $translateProvider: angular.translate.ITranslateProvider) {

        $urlRouterProvider.otherwise('/page/tutorial');

        /* Translate Provider */
        let prefix = 'assets/i18n/';
        let suffix = '.json';

        $translateProvider.useStaticFilesLoader({
            prefix: prefix,
            suffix: suffix
        });

        $translateProvider.preferredLanguage('es');
    }

})();
