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
        goToDetail: (card: app.models.card.Card) => void;
    }

    export interface ICardsPageScope extends angular.IScope {
        popupConfig: app.interfaces.IPopup;
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
                          '$scope',
                          'finApp.models.card.CardService',
                          'finApp.core.util.GiveRewardService',
                          'finApp.core.util.CustomPopupService'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $state: ng.ui.IStateService,
                    public $scope: ICardsPageScope,
                    private CardService: app.models.card.CardService,
                    private GiveRewardService: app.core.util.giveReward.GiveRewardService,
                    private CustomPopupService: app.core.util.customPopup.CustomPopupService) {
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
        private _getUserCardsList(): angular.IPromise<Array<app.models.card.UserCard>> {
            return this.CardService.getCardsByUserId();
        }
        //TODO: Investigar bien como se gestiona el tipo de dato: Promise, ya que aqui
        //deberia recibir un Array<app.models.card.UserCard> no una Promise
        private _buildCardAlbum(userCards: any): any {

            return this.CardService.getAllCards().then(
                function(cards){
                    //Get cards total
                    let total = cards.length;
                    //Look for If user has any card
                    let album = cards.map(
                        function(card: any){
                            for (let i = 0; i < userCards.length; i++) {
                                if(card.uid === userCards[i].uid){
                                    //User has this card
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


        /*
        * show card detail popup
        * @description this method is launched when user press one card's block
        */
        goToDetail(card): void {
            var popupConfig = {
                cardData: card
            };
            //Invoke card reward popup
            this.CustomPopupService.invokeCardRewardPopup(this.$scope, popupConfig);
        }


    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.pages.cardsPage')
        .controller(CardsPageController.controllerId, CardsPageController);

}
