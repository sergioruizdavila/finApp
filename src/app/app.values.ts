/**
 * values() Here we define each core variables
 * such as user logged Id, end points, etc
 *
 * @param {IDataConfig} dataConfig
 * @return {void}
 */

/*--  INTERFACE --*/
interface IDataConfig {
    apiServiceBaseUri: string;
    userId: string;
}

/*--  MAIN FUNCTION --*/
(function (): void {

    'use strict';

    var dataConfig: IDataConfig = {
        apiServiceBaseUri: 'baseUrl',
        userId: ''
    };

    angular
        .module('finApp')
        .value('dataConfig', dataConfig);

})();
