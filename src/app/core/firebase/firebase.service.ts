/**
 * FirebaseFactory
 * @description - Firebase Service in order to create Firebase connection
 * @constructor
 */

module app.core.firebase {

    'use strict';

    export interface IFirebaseFactory {

    }

    export class FirebaseFactory implements IFirebaseFactory {

        static serviceId = 'finApp.core.firebase.FirebaseFactory';
        url: string;

        //inject dependencies
        static $inject = ['dataConfig'];

        constructor(private dataConfig: IDataConfig) {
            this.url = dataConfig.baseUrl;
        }

        /*-- METHODS --*/

        /**
        * Creates a new Firebase JavaScript API Object from this configuration.
        * @returns {Firebase}
        */
        createFirebase(): Firebase {
            return new Firebase(this.url);
        }


        static instance(dataConfig: IDataConfig): IFirebaseFactory {
            return new FirebaseFactory(dataConfig);
        }

    }

    angular.module('finApp.core.firebase', [])
    .factory(FirebaseFactory.serviceId, FirebaseFactory.instance);

}
