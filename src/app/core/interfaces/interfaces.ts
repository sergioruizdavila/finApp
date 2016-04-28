/**
 * Specifies the Interfaces throughout App
 */

module app.interfaces {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/

    export interface IFinAppRootScope extends angular.IRootScopeService {
        User: app.models.user.UserFirebase;
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
