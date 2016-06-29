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
        createNewCard: (card: Card, callback: (err) => void) => void;
        saveUserCard: (card: UserCard, callback: (err) => void) => void;
        getAllCards: () => angular.IPromise<Array<Card>>;
        getCardsByUserId: () => angular.IPromise<Array<UserCard>>;
        getCardById: (uid: string) => angular.IPromise<AngularFireObject>;
        getCardDetails: (userCard: UserCard) => angular.IPromise<Card>;
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
        * @params {function} callback - function callback required to know if
        * It created a new card
        */
        createNewCard(card, callback): void {
            let url = '/typeOfCard/' + card.Uid;
            this.FirebaseFactory.add(url, card, callback);
        }

        /**
        * saveUserCard
        * @description - give a new card to logged user
        * @function
        * @params {Card} card - card to user
        * @params {function} callback - function callback required to know if
        * It created a new user card
        */
        saveUserCard(card): any {
            let url = '/users/' + this.$rootScope.User.Uid + '/cards/' + card.uid;
            return this.FirebaseFactory.addWithPromise(url, card);
        }

        /**
        * getAllCards
        * @description - get all cards
        * @function
        * @return {angular.IPromise<Array<Card>>} return a promise with
        * cards list
        */
        getAllCards(): angular.IPromise<Array<Card>> {
            let url = '/typeOfCard/';
            return this.FirebaseFactory.getArray(url).then(function(data){
                let cards = [];
                for (let i = 0; i < data.length; i++) {
                    let cardInstance = new Card(data[i]);
                    cards.push(cardInstance);
                }
                return cards;
            }).catch(function(err) {
                console.log(err);
                return err;
            });
        }

        /**
        * getCardsByUserId
        * @description - get all user's cards
        * @function
        * @return {angular.IPromise<AngularFireArray>} return a promise with
        * user's cards list
        */
        getCardsByUserId(): angular.IPromise<Array<UserCard>> {
            let url = '/users/' + this.$rootScope.User.Uid + '/cards/';
            return this.FirebaseFactory.getArray(url).then(function(data){
                let userCards = [];
                for (let i = 0; i < data.length; i++) {
                    let cardInstance = new UserCard(data[i]);
                    userCards.push(cardInstance);
                }
                return userCards;
            }).catch(function(err) {
                console.log(err);
                return err;
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
            let url = '/typeOfCard/' + uid;
            return this.FirebaseFactory.getObject(url).then(function(data){
                return data;
            }).catch(function(err) {
                console.log(err);
                return err;
            });
        }

        /**
        * getCardDetails
        * @description - get card details
        * @use - this.CardService.getCardDetails(userCard);
        * @function
        * @params {string} uid - card uid
        * @return {angular.IPromise<AngularFireObject>} return a promise with
        * a card details
        */
        getCardDetails(userCard): angular.IPromise<Card> {
            return this.getCardById(userCard.Uid).then(function(details) {
                let userCardDetails = new Card(_.merge(userCard, details));
                return userCardDetails;
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
