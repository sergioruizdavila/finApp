/**
* ManagementFunctionsService
* @description - It is necessary to move to order file or management module
* @constructor
*/

module app.core.util {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IManagementFunctionsService {
        addNewDataGroupWithMembers: () => any;
        addNewFormula: () => any;
    }



    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class ManagementFunctionsService implements IManagementFunctionsService {

        static serviceId = 'finApp.core.util.ManagementFunctionsService';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/

        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['finApp.models.dataGroup.DataGroupService',
                          'finApp.models.formula.FormulaService'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private DataGroupService: app.models.dataGroup.DataGroupService,
                    private FormulaService: app.models.formula.FormulaService) {
            console.log('ManagementFunctionsService service called');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/


        /**
        * addNewDataGroupWithMembers
        * @description - temporal function in order to add new data group with
        * members on database
        * @function
        * @return {void}
        */
        addNewDataGroupWithMembers(): any {
            let data = {
                title: ' income',
                members: [
                    {
                        title: 'salary'
                    },
                    {
                        title: 'business'
                    },
                    {
                        title: 'investment'
                    }
                ]
            };

            let members = [];

            let dataGroup = new app.models.dataGroup.DataGroup();
            dataGroup.Title = data.title;

            this.DataGroupService.createNewDataGroup(dataGroup, function(){});

            for (let i = 0; i < data.members.length; i++) {
                let member = new app.models.dataGroup.Member();
                member.Title = data.members[i].title;
                members.push(member);
                dataGroup.addMember(member);
                this.DataGroupService.saveMember(member, dataGroup.Uid, function(){});
            }
        }


        /**
        * addNewFormula
        * @description - temporal function in order to add new formula on database
        * @function
        * @return {void}
        */
        addNewFormula(): any {
            let formula = new app.models.formula.Formula();

            this.FormulaService.createNewFormula(formula, function(){});

        }



    }

    /*-- MODULE DEFINITION --*/
    angular
    .module('finApp.core.util')
    .service(ManagementFunctionsService.serviceId, ManagementFunctionsService);

}
