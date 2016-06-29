/**
 * DataGroupService
 * @description - Services related on Data Group Model.
 * @constructor
 * @param {app.core.firebase.IFirebaseFactory} FirebaseFactory - instance Firebase services.
 * @param {AngularFireObjectService} $firebaseObject - firebase provider that let create three binding objects.
 * @param {AngularFireArrayService} $firebaseArray - firebase provider that let create three binding array objects.
 * @param {app.interfaces.IFinAppRootScope} $rootScope - main scope
 */

module app.models.dataGroup {

    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IDataGroupService {
        ref: any;
        createNewDataGroup: (group: DataGroup, callback: (err) => void) => void;
        getAllDataGroups: () => angular.IPromise<Array<DataGroup>>;
        getDataGroupById: (uid: string) => angular.IPromise<DataGroup>;
        getMemberById: (dataGroupUid: string, memberUid: string) => angular.IPromise<app.models.formula.IVariable>;
        saveMember: (member: Member, dataGroupId: string, callback: (err) => void) => void;    
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class DataGroupService implements IDataGroupService {

        static serviceId = 'finApp.models.dataGroup.DataGroupService';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        ref: Firebase;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['finApp.core.firebase.FirebaseFactory',
                          '$firebaseObject',
                          '$firebaseArray',
                          '$rootScope'];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private FirebaseFactory: app.core.firebase.IFirebaseFactory,
                    private $firebaseObject: AngularFireObjectService,
                    private $firebaseArray: AngularFireArrayService,
                    private $rootScope: app.interfaces.IFinAppRootScope) {

            this.ref = this.FirebaseFactory.createFirebase();

        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * createNewDataGroup
        * @description - create new data group on firebase
        * @function
        * @params {DataGroup} group - new data group (example: income, expense, goal, etc.)
        * @params {function} callback - function callback required to know if
        * It created a new data group
        */
        createNewDataGroup(group: DataGroup, callback): void {
            let url = '/dataGroups/' + group.Uid;
            this.FirebaseFactory.add(url, group, callback);
        }

        /**
        * getAllDataGroups
        * @description - get all data groups
        * @function
        * @return {angular.IPromise<Array<DataGroup>>} return a promise with
        * data groups list
        */
        getAllDataGroups(): angular.IPromise<Array<DataGroup>> {
            let url = '/dataGroups/';
            return this.FirebaseFactory.getArray(url).then(function(data){
                let dataGroups = [];
                for (let i = 0; i < data.length; i++) {
                    let dataGroupsInstance = new DataGroup(data[i]);
                    dataGroups.push(dataGroupsInstance);
                }
                return dataGroups;
            }).catch(function(err) {
                console.log(err);
                return err;
            });
        }


        /**
        * getDataGroupById
        * @description - get data group by uid
        * @use - this.DataGroupService.getDataGroupById('98d667ae-2231-4347-8a94-b955baf218f6');
        * @function
        * @params {string} uid - data group uid
        * @return {angular.IPromise<DataGroup>} return a promise with
        * a specific data group
        */
        getDataGroupById(uid): angular.IPromise<DataGroup> {
            let url = '/dataGroups/' + uid;
            return this.FirebaseFactory.getObject(url).then(function(details){
                let dataGroupDetails = new DataGroup(details);
                return dataGroupDetails;
            }).catch(function(err) {
                console.log(err);
                return err;
            });
        }

        /**
        * getMemberById
        * @description - get specific data groups member by id
        * @function
        * @params {string} dataGroupUid - data group uid
        * @params {string} memberUid - data group member uid
        * @return {angular.IPromise<app.models.formula.IVariable>} return a
        * promise with data groups list
        */
        getMemberById(dataGroupUid, memberUid): angular.IPromise<app.models.formula.IVariable> {
            let url = '/dataGroups/' + dataGroupUid + '/members/' + memberUid;
            return this.FirebaseFactory.getObject(url).then(
                function(member: app.models.formula.IVariable){
                    return member;
                }
            ).catch(function(err) {
                console.log(err);
                return err;
            });
        }

        /**
        * saveMember
        * @description - add/update data group member on firebase
        * @function
        * @params {Member} member - data group member
        * @params {string} dataGroupId - data group uid
        * @params {function} callback - function callback required to know if
        * It saved necessary expense
        */
        saveMember(member, dataGroupId, callback): void {
            let url = '/dataGroups/' + dataGroupId + '/members/' + member.Uid;
            this.FirebaseFactory.add(url, member, callback);
        }


        /**********************************/
        /*        INSTANCE FACTORY        */
        /**********************************/
        static instance(FirebaseFactory: app.core.firebase.IFirebaseFactory,
            $firebaseObject: AngularFireObjectService,
            $firebaseArray: AngularFireArrayService,
            $rootScope: app.interfaces.IFinAppRootScope): IDataGroupService {

            return new DataGroupService(FirebaseFactory,
                                   $firebaseObject,
                                   $firebaseArray,
                                   $rootScope);
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.models.dataGroup', [])
        .factory(DataGroupService.serviceId, [
            'finApp.core.firebase.FirebaseFactory',
            '$firebaseObject',
            '$firebaseArray',
            '$rootScope',
            DataGroupService.instance
        ]);

}
