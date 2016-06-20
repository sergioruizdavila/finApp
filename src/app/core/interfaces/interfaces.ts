/**
 * Specifies the Interfaces throughout App
 */

module app.interfaces {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/

    export interface IFinAppRootScope extends angular.IRootScopeService {
        User: app.models.user.UserFirebase;
        auth: any;
        session: any;
    }

    export interface IUserDataAuth {
        email: string;
        password: string;
    }

    export interface IDateFormatted {
        complete: string;
        day: string;
        month: string;
        year: string;
    }

    //Popup interface for all popup on FinApp
    export interface IPopup {
        subtitle?: string;
        textsList?: Array<string>;
        cardData?: app.models.card.Card;
        opened?: boolean;
        withPack?: boolean;
    }

}
