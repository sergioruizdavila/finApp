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
            'finApp.auth',
            'finApp.core',
            'finApp.core.util',
            'finApp.core.firebase',
            'finApp.localStorage',
            'finApp.pages.main',
            'finApp.pages.tutorialPage',
            'finApp.pages.signUpPage',
            'finApp.pages.logInPage',
            'finApp.pages.historyPage',
            'finApp.pages.financeDetailPage',
            'finApp.pages.cardsPage',
            'finApp.pages.profilePage',
            'finApp.pages.addSalaryPage',
            'finApp.pages.addInvestmentPage',
            'finApp.pages.addBusinessPage',
            'finApp.pages.addNecessaryExpensePage',
            'finApp.pages.addUnnecessaryExpensePage',
            'finApp.components.tabs',
            'finApp.components.faExpenseDetailPopup',
            'finApp.components.faListPopup',
            'finApp.components.rewardPopup.faCardPopup',
            'finApp.models.user',
            'finApp.models.finance'
        ])
        .config(config);

    function config($urlRouterProvider: angular.ui.IUrlRouterProvider,
                    $translateProvider: angular.translate.ITranslateProvider,
                    $ionicConfigProvider: any) {

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
