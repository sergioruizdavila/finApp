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
                          '$rootScope'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private CardService: app.models.card.CardService,
                    private UserService: app.models.user.UserService,
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
            let self = this;
            //Get all cards
            return this.CardService.getAllCards().then(
                function(cards: any) {
                    //2. Escogemos una al azar
                    let randomCard = new app.models.card.UserCard();
                    randomCard.Uid = cards[Math.floor(Math.random()*cards.length)].uid;
                    //3. Asignamos una cantidad de cartas
                    randomCard.Amount = 1;
                    //4. Asignamos un status
                    /*TODO: No podemos asignar un status asi, ya que si el usuario
                    tiene una carta del mismo tipo, no deberia mostrar el Status Nuevo,
                    sino 'Repetido' y mostrar la cantidad de cartas repetidas*/
                    randomCard.Status = 'Nuevo';
                    //5. Guardar la nueva carta en la base
                    return self.CardService.saveUserCard(randomCard).then(
                        function(err) {
                            if (err) { throw 'Error: Not saved user card'; }
                            //Get Card details
                            return self.CardService.getCardDetails(randomCard).then(
                                function(userCardDetails){
                                    /*User received his/her reward, so we change
                                    first time value to false */
                                    if(self.$rootScope.User.FirstTime) {
                                        self.$rootScope.User.FirstTime = false;
                                        self.UserService.saveFirstTime(self.$rootScope.User.FirstTime);
                                    }
                                    
                                    return userCardDetails;
                                }
                            );
                        }
                    );
                }
            );

        }


    }

    /*-- MODULE DEFINITION --*/
    angular
    .module('finApp.core.util')
    .service(GiveRewardService.serviceId, GiveRewardService);

}
