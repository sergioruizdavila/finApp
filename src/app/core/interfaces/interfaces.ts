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

    export interface IPopup {
        subtitle?: string;
        textsList?: Array<string>;
    }

}
