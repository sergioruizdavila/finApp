/**
 * Specifies the Interfaces throughout App
 */

module app.interfaces {

    /*******************************/
    /*     ROOTSCOPE INTERFACE     */
    /*******************************/
    export interface IFinAppRootScope extends angular.IRootScopeService {
        User: app.models.user.UserFirebase;
        auth: any;
        session: any;
    }

    /*******************************/
    /*   USER DATA AUTH INTERFACE  */
    /*******************************/
    export interface IUserDataAuth {
        email: string;
        password: string;
    }

    /*******************************/
    /*   DATE FORMATTED INTERFACE  */
    /*******************************/
    export interface IDateFormatted {
        complete: string;
        day: string;
        month: string;
        year: string;
    }

    /********************************/
    /*    STATEPARAMS INTERFACES    */
    /********************************/
    export interface IDataConfig extends ng.ui.IStateParamsService {
        financeId: string;
        action: IActionParams;
        formula?: app.models.formula.Formula;
    }

    export interface IActionParams {
        type: string;
        data: app.models.finance.IMoney;
        callsStack: Array<ICallsStack>;
        posOnCallsStack: number;
    }

    export interface ICallsStack {
        title?: string;
        route: string;
        update?: boolean;
        value?: app.models.finance.IMoney;
    }
    /////////////////////////////////


    /********************************/
    /*      POPUPS INTERFACES       */
    /********************************/
    export interface IPopup {
        subtitle?: string;
        textsList?: Array<string>;
        cardData?: app.models.card.Card;
        opened?: boolean;
        withPack?: boolean;
    }

}
