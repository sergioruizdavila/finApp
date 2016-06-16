/**
* giveRewardService
* @description - Service with function in order to give rewards to Logged User
* @constructor
*/

module app.core.util.giveReward {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IGiveRewardService {
        giveCard: () => void;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class GiveRewardService implements IGiveRewardService {

        static serviceId = 'finApp.core.util.GiveRewardService';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/

        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['finApp.models.card.CardService',
                          'finApp.models.user.UserService',
                          'finApp.core.util.FunctionsUtilService',
                          '$filter',
                          '$rootScope'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private CardService: app.models.card.CardService,
                    private UserService: app.models.user.UserService,
                    private FunctionsUtilService: app.core.util.functionsUtil.FunctionsUtilService,
                    private $filter: angular.IFilterService,
                    private $rootScope: app.interfaces.IFinAppRootScope) {
            console.log('functionsUtil service called');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * giveCard
        * @description - give reward: Card
        * @use - this.RewardService.giveCard();
        * @function
        * @params {string} userId - logged user uid
        * @return {app.models.card.Card} - user card reward
        */
        giveCard(): any {
            //VARIABLES
            let self = this;
            let randomCard = new app.models.card.UserCard();
            //CONSTANTS
            const NEW_STATUS = this.$filter('translate')('%reward.card.status.new.text');
            //Get all cards
            return this.CardService.getAllCards().then(function(cards: any) {

                return self.CardService.getCardsByUserId().then(function(userCards: Array<app.models.card.UserCard>) {

                    randomCard.Uid = cards[Math.floor(Math.random()*cards.length)].uid;
                    //To know if the user already has this card
                    let position = self.FunctionsUtilService.getPositionByUid(userCards, randomCard.Uid);

                    if(position != -1) {
                        randomCard.Amount = userCards[position].Amount + 1;
                        randomCard.Status = '';
                    } else {
                        randomCard.Amount = 1;
                        randomCard.Status = NEW_STATUS;
                    }

                    return self.CardService.saveUserCard(randomCard).then(function(err) {
                        if (err) { throw 'Error: Not saved user card'; }
                        //Get Card details
                        return self.CardService.getCardDetails(randomCard).then(function(userCardDetails){
                            //Change first time value to false
                            if(self.$rootScope.User.FirstTime) {
                                self.$rootScope.User.FirstTime = false;
                                self.UserService.saveFirstTime(self.$rootScope.User.FirstTime);
                            }
                            return userCardDetails;
                        });
                    });
                });

            });
        }


    }

    /*-- MODULE DEFINITION --*/
    angular
    .module('finApp.core.util')
    .service(GiveRewardService.serviceId, GiveRewardService);

}
