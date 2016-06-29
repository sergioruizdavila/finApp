/**
 * FormulaService
 * @description - Services related on Formula Model.
 * @constructor
 * @param {app.core.firebase.IFirebaseFactory} FirebaseFactory - instance Firebase services.
 * @param {AngularFireObjectService} $firebaseObject - firebase provider that let create three binding objects.
 * @param {AngularFireArrayService} $firebaseArray - firebase provider that let create three binding array objects.
 * @param {app.interfaces.IFinAppRootScope} $rootScope - main scope
 */

module app.models.formula {

    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IFormulaService {
        ref: any;
        createNewFormula: (formula: Formula, callback: (err) => void) => void;
        getAllFormulas: () => angular.IPromise<Array<Formula>>;
        getFormulaById: (uid: string) => angular.IPromise<Formula>;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class FormulaService implements IFormulaService {

        static serviceId = 'finApp.models.formula.FormulaService';

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
        * createNewFormula
        * @description - create new formula on firebase
        * @function
        * @params {Formula} formula - new formula
        * @params {function} callback - function callback required to know if
        * It created a new formula
        */
        createNewFormula(formula, callback): void {
            let url = '/formulas/' + formula.Uid;
            this.FirebaseFactory.add(url, formula, callback);
        }

        /**
        * getAllFormulas
        * @description - get all formulas
        * @function
        * @return {angular.IPromise<Array<Formula>>} return a promise with
        * formulas list
        */
        getAllFormulas(): angular.IPromise<Array<Formula>> {
            let url = '/formulas/';
            return this.FirebaseFactory.getArray(url).then(function(data){
                let formulas = [];
                for (let i = 0; i < data.length; i++) {
                    let formulaInstance = new Formula(data[i]);
                    formulas.push(formulaInstance);
                }
                return formulas;
            }).catch(function(err) {
                console.log(err);
                return err;
            });
        }


        /**
        * getFormulaById
        * @description - get formula by uid
        * @use - this.FormulaService.getFormulaById('98d667ae-2231-4347-8a94-b955baf218f6');
        * @function
        * @params {string} uid - formula uid
        * @return {angular.IPromise<Formula>} return a promise with
        * a specific formula
        */
        getFormulaById(uid): angular.IPromise<Formula> {
            let url = '/formulas/' + uid;
            return this.FirebaseFactory.getObject(url).then(function(details){
                let formulaDetails = new Formula(details);
                return formulaDetails;
            }).catch(function(err) {
                console.log(err);
                return err;
            });
        }


        /**********************************/
        /*        INSTANCE FACTORY        */
        /**********************************/
        static instance(FirebaseFactory: app.core.firebase.IFirebaseFactory,
            $firebaseObject: AngularFireObjectService,
            $firebaseArray: AngularFireArrayService,
            $rootScope: app.interfaces.IFinAppRootScope): IFormulaService {

            return new FormulaService(FirebaseFactory,
                                   $firebaseObject,
                                   $firebaseArray,
                                   $rootScope);
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.models.formula', [])
        .factory(FormulaService.serviceId, [
            'finApp.core.firebase.FirebaseFactory',
            '$firebaseObject',
            '$firebaseArray',
            '$rootScope',
            FormulaService.instance
        ]);

}
