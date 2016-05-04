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
        getArray: (url: string) => any;
        getArrayByDate: (url: string, startDate: string, endDate: string) => any;
    }

    export class FirebaseFactory implements IFirebaseFactory {

        static serviceId = 'finApp.core.firebase.FirebaseFactory';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        baseUrl: string;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['dataConfig', '$firebaseArray'];

        constructor(dataConfig: IDataConfig,
                    private $firebaseArray: AngularFireArrayService) {
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

        /**
        * getArray
        * @description - get data arry against Firebase
        * @function
        * @params {string} url - uri of firebase
        */
        getArray(url): any {
            let ref = new Firebase(this.baseUrl + url);
            return this.$firebaseArray(ref).$loaded().then(function(data) {
                return data;
            });
        }

        /**
        * getArrayByDate
        * @description - get data by date range against Firebase
        * @function
        * @params {string} url - uri of firebase
        * @params {string} startDate - start specific Date
        * @params {string} endDate - end specific Date
        */
        getArrayByDate(url, startDate, endDate): any {
            let ref = new Firebase(this.baseUrl + url);
            let query: any = ref.orderByChild("dateCreated/complete").startAt(startDate).endAt(endDate);
            return this.$firebaseArray(query).$loaded().then(function(data) {
                return data;
            });
        }



        static instance(dataConfig: IDataConfig,
                        $firebaseArray: AngularFireArrayService): IFirebaseFactory {
            return new FirebaseFactory(dataConfig, $firebaseArray);
        }

    }

    angular.module('finApp.core.firebase', [])
    .factory(FirebaseFactory.serviceId, ['dataConfig',
        '$firebaseArray',
        FirebaseFactory.instance]);

}
