/**
 * CardsPageController
 * @description - Cards Page Controller
 */

module app.pages.cardsPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ICardsPageController {
        activate: () => void;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class CardsPageController implements ICardsPageController {

        static controllerId = 'finApp.pages.cardsPage.CardsPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        //TODO: Cambiar el any por app.models.Card guiarse de Gastos
        private _userCardsList: Array<any>;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$state',
                          'finApp.models.card.CardService',
                          'finApp.core.util.GiveRewardService'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $state: ng.ui.IStateService,
                    private CardService: app.models.card.CardService,
                    private GiveRewardService: app.core.util.giveReward.GiveRewardService) {
            this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //this.GiveRewardService.giveCard();
            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('cardsPage controller actived');
            //VARIABLES
            let self = this;
            //Get user's cards list
            this._getUserCardsList().then(
                function(userCards) {
                    self._buildCardAlbum(userCards).then(
                        function(album) {
                            self._userCardsList = album;
                        }
                    );
                }
            );
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/
        private _getUserCardsList(): angular.IPromise<AngularFireArray> {
            return this.CardService.getCardsByUserId();
        }
        //TODO: Investigar bien como se gestiona el tipo de dato: Promise, ya que aqui
        //deberia recibir un Array<app.models.card.UserCard> no una Promise
        private _buildCardAlbum(userCards: any): any {

            return this.CardService.getAllCards().then(
                function(cards){
                    //Saber cuanto es la cantidad total de cartas
                    let total = cards.length;
                    //Buscamos si el usuario tiene alguna carta
                    let album = cards.map(
                        function(card: any){
                            for (let i = 0; i < userCards.length; i++) {
                                if(card.uid === userCards[i].uid){
                                    //TODO: Quiere decir que el user tiene esa tarjeta
                                    var merge = _.merge(card, userCards[i]);
                                    return merge;
                                } else  {
                                    //It's the last element
                                    if(i == userCards.length -1){
                                        var gray = {
                                            uid: card.uid,
                                            formulaId: card.formulaId,
                                            gray: true
                                        };
                                        return gray;
                                    }
                                }
                            }
                        }
                    );

                    console.log('user album: ', album);

                    return album;
                }
            );
        }



    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.pages.cardsPage')
        .controller(CardsPageController.controllerId, CardsPageController);

}
