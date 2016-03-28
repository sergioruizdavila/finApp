/**
 * values() Here we define each core variables
 * such as user logged Id, end points, etc
 *
 * @param {IDataConfig} dataConfig
 * @return {void}
 */

/*--  INTERFACE --*/
interface IDataConfig {
    baseUrl: string;
    userId: string;
}

/*--  MAIN FUNCTION --*/
(function (): void {

    'use strict';

    var dataConfig: IDataConfig = {
        baseUrl: 'https://shining-fire-8072.firebaseio.com/users',
        userId: ''
    };

    angular
        .module('finApp')
        .value('dataConfig', dataConfig);

})();
