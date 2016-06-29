/**
 * Specifies the Classes and Interfaces related to Formulas in our Model
 */

module app.models.formula {

    /****************************************/
    /*              INTERFACES              */
    /****************************************/

    export interface IFormula {
        uid: string;
        variables: Array<IVariable>;
    }

    export interface IVariable {
        uid: string;
        dataGroupId: string;
        memberId: string;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/

    export class Formula {

        /*-- PROPERTIES --*/
        private uid: string;
        private variables: Array<IVariable>;


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Formula Model instanced');

            //init properties
            this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();

            if(_.isEmpty(obj)) {
                this.variables = [];
            } else {
                for (let key in obj.variables) {
                    this.variables = [];
                    this.addVariable(obj.variables[key]);
                }
            }

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Uid() {
            return this.uid;
        }

        set Uid(uid: string) {
            if (uid === undefined) { throw 'Please supply Formula uid'; }
            this.uid = uid;
        }

        get Variable() {
            return this.variables;
        }

        addVariable(variable: IVariable): void {
            if(variable === undefined) { throw 'Please supply variable formula element (Add)'; }
            this.variables.push(variable);
        }

        editVariable(variable: IVariable): void {
            if(variable === undefined) { throw 'Please supply variable formula element (Edit)'; }
            //Edit existing Variable
            this.variables.forEach(function (element, index, array) {
                if (variable.uid === element.uid) {
                    array[index] = variable;
                }
            });
        }

    }

}
