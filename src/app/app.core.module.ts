/**
 * module() Here inject dependencies of Angular Modules and 3rd Party
 *
 * @param {none}
 * @return {void}
 */

(function (): void {
    'use strict';

    angular.module('finApp.core', [
        /*Angular Modules*/
        'pascalprecht.translate',

        /*3rd Party*/
        'ionic',
        'firebase',
        'ngCordova'
    ]);

})();
