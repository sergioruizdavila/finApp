/**
 * FirebaseFactory
 * @description - Firebase Service in order to create Firebase connection
 * @constructor
 */

module app.core.firebase {

    'use strict';

    export interface IFirebaseFactory {
        createFirebase: () => Firebase;
        update: (url: string, data: any) => void;
        add: (url: string, data: any) => void;
    }

    export class FirebaseFactory implements IFirebaseFactory {

        static serviceId = 'finApp.core.firebase.FirebaseFactory';
        baseUrl: string;

        //inject dependencies
        static $inject = ['dataConfig'];

        constructor(dataConfig: IDataConfig) {
            this.baseUrl = dataConfig.baseUrl;
        }

        /*-- METHODS --*/

        /**
        * Creates a new Firebase JavaScript API Object from this configuration.
        * @returns {Firebase}
        */
        createFirebase(): Firebase {
            return new Firebase(this.baseUrl);
        }

        /**
        * update
        * @description - update service against Firebase
        * @function
        * @params {string} url - uri of firebase
        * @params {any} data - data to send in order to update object on firebase
        */
        update(url, data): void {
            let ref = new Firebase(this.baseUrl + url);
            ref.update(data);
        }

        /**
        * add
        * @description - add item on Array against Firebase
        * @function
        * @params {string} url - uri of firebase
        * @params {any} data - item to send in order to add object on firebase
        */
        add(url, data): void {
            let ref = new Firebase(this.baseUrl + url);
            ref.set(data);
        }



        static instance(dataConfig: IDataConfig): IFirebaseFactory {
            return new FirebaseFactory(dataConfig);
        }

    }

    angular.module('finApp.core.firebase', [])
    .factory(FirebaseFactory.serviceId, ['dataConfig', FirebaseFactory.instance]);

}
