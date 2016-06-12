/**
 * CardService
 * @description - Services related on Card Model.
 * @constructor
 * @param {app.core.firebase.IFirebaseFactory} FirebaseFactory - instance Firebase services.
 * @param {AngularFireObjectService} $firebaseObject - firebase provider that let create three binding objects.
 * @param {AngularFireArrayService} $firebaseArray - firebase provider that let create three binding array objects.
 * @param {app.interfaces.IFinAppRootScope} $rootScope - main scope
 */

module app.models.card {

    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ICardService {
        ref: any;
        createNewCard: (card: Card) => void;
        giveCard: (card: UserCard) => void;
        getAllCards: () => angular.IPromise<AngularFireArray>;
        getCardsByUserId: () => angular.IPromise<AngularFireArray>;
        getCardById: (uid: string) => angular.IPromise<AngularFireObject>;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class CardService implements ICardService {

        static serviceId = 'finApp.models.card.CardService';

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
        * createNewCard
        * @description - create new card category on firebase
        * @function
        * @params {Card} card - new card category
        */
        createNewCard(card): void {
            let url = '/typeOfCard/' + card.Uid;
            this.FirebaseFactory.add(url, card);
        }

        /**
        * giveCard
        * @description - give a new card to logged user
        * @function
        * @params {Card} card - card to user
        * @params {string} userId - logged user uid
        */
        giveCard(card): void {
            let url = '/users/' + this.$rootScope.User.Uid + '/cards/' + card.uid;
            this.FirebaseFactory.add(url, card);
        }

        /**
        * getAllCards
        * @description - get all cards
        * @function
        * @return {angular.IPromise<AngularFireArray>} return a promise with
        * cards list
        */
        getAllCards(): angular.IPromise<AngularFireArray> {
            let url = '/typeOfCard/';
            return this.FirebaseFactory.getArray(url).then(function(data){
                return data;
            });
        }

        /**
        * getCardsByUserId
        * @description - get all user's cards
        * @function
        * @return {angular.IPromise<AngularFireArray>} return a promise with
        * user's cards list
        */
        getCardsByUserId(): angular.IPromise<AngularFireArray> {
            let url = '/users/' + this.$rootScope.User.Uid + '/cards/';
            return this.FirebaseFactory.getArray(url).then(function(data){
                return data;
            });
        }

        /**
        * getCardById
        * @description - get card by uid
        * @use - this.CardService.getCardById('98d667ae-2231-4347-8a94-b955baf218f6');
        * @function
        * @params {string} uid - card uid
        * @return {angular.IPromise<AngularFireObject>} return a promise with
        * a specific card
        */
        getCardById(uid): angular.IPromise<AngularFireObject> {
            let url = '/cards/' + uid;
            return this.FirebaseFactory.getObject(url).then(function(data){
                return data;
            });
        }


        /**********************************/
        /*        INSTANCE FACTORY        */
        /**********************************/
        static instance(FirebaseFactory: app.core.firebase.IFirebaseFactory,
            $firebaseObject: AngularFireObjectService,
            $firebaseArray: AngularFireArrayService,
            $rootScope: app.interfaces.IFinAppRootScope): ICardService {

            return new CardService(FirebaseFactory,
                                   $firebaseObject,
                                   $firebaseArray,
                                   $rootScope);
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.models.card', [])
        .factory(CardService.serviceId, [
            'finApp.core.firebase.FirebaseFactory',
            '$firebaseObject',
            '$firebaseArray',
            '$rootScope',
            CardService.instance
        ]);

}
