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
                          '$rootScope'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private cardService: app.models.card.CardService,
                    private $rootScope: app.interfaces.IFinAppRootScope) {
            console.log('functionsUtil service called');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * giveCard
        * @description - give reward: Card
        * @use - this.RewardService.giveCard('98d667ae-2231-4347-8a94-b955baf218f6');
        * @function
        * @params {string} userId - logged user uid
        */
        giveCard(): void {
            /*TODO: Aqui deberia estar toda la logica de dar una carta al usuario*/
            //TEST
            let self = this;
            /*let card = new app.models.card.Card();
            card.Title = '%reward.card.3.title.text';
            card.Description = '%reward.card.3.description.text';
            card.Emblem = 'Bag.png';
            card.FormulaId = '3';
            this.cardService.createNewCard(card);

            let card4 = new app.models.card.Card();
            card4.Title = '%reward.card.4.title.text';
            card4.Description = '%reward.card.4.description.text';
            card4.Emblem = 'Bank.png';
            card4.FormulaId = '4';
            this.cardService.createNewCard(card4);

            let card5 = new app.models.card.Card();
            card5.Title = '%reward.card.5.title.text';
            card5.Description = '%reward.card.5.description.text';
            card5.Emblem = 'Business Graph.png';
            card5.FormulaId = '5';
            this.cardService.createNewCard(card5);

            let card6 = new app.models.card.Card();
            card6.Title = '%reward.card.6.title.text';
            card6.Description = '%reward.card.6.description.text';
            card6.Emblem = 'Business Plan.png';
            card6.FormulaId = '6';
            this.cardService.createNewCard(card6);

            let card7 = new app.models.card.Card();
            card7.Title = '%reward.card.7.title.text';
            card7.Description = '%reward.card.7.description.text';
            card7.Emblem = 'Business Progress.png';
            card7.FormulaId = '7';
            this.cardService.createNewCard(card7);

            let card8 = new app.models.card.Card();
            card8.Title = '%reward.card.8.title.text';
            card8.Description = '%reward.card.8.description.text';
            card8.Emblem = 'Business Trip.png';
            card8.FormulaId = '8';
            this.cardService.createNewCard(card8);

            let card9 = new app.models.card.Card();
            card9.Title = '%reward.card.9.title.text';
            card9.Description = '%reward.card.9.description.text';
            card9.Emblem = 'Chart.png';
            card9.FormulaId = '9';
            this.cardService.createNewCard(card9);*/

            //TEST GIVE CARD
            //1. Obtenemos todas las cartas
            this.cardService.getAllCards().then(
                function(cards: any){
                    //2. Escogemos una al azar
                    let randomCard = new app.models.card.UserCard();
                    randomCard.uid = cards[Math.floor(Math.random()*cards.length)].uid;
                    //3. Asignamos una cantidad de cartas
                    randomCard.Amount = 1;
                    //4. Asignamos un status
                    /*TODO: No podemos asignar un status asi, ya que si el usuario
                    tiene una carta del mismo tipo, no deberia mostrar el Status Nuevo,
                    sino 'Repetido' y mostrar la cantidad de cartas repetidas*/
                    randomCard.Status = 'Nuevo';
                    //5. Guardar la nueva carta en la base
                    /*TODO: Cambiar nombre de este servicio 'giveCard', a otro nombre
                    ya que confunde que el metodo de reward se llame igual*/
                    self.cardService.giveCard(randomCard);
                }
            );

        }


    }

    /*-- MODULE DEFINITION --*/
    angular
    .module('finApp.core.util')
    .service(GiveRewardService.serviceId, GiveRewardService);

}
