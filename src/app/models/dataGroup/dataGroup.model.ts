/**
 * Specifies the Classes and Interfaces related to Data Group in our Model
 */

module app.models.dataGroup {

    /****************************************/
    /*              INTERFACES              */
    /****************************************/

    export interface IDataGroup {
        uid: string;
        members: Array<Member>;
        title: string;
    }

    /****************************************/
    /*                 ENUM                 */
    /****************************************/

    export class EnumDataGroup {

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(public value: string) {}

        /**********************************/
        /*             VALUES             */
        /**********************************/
        static income = new EnumDataGroup("0948b5f1-ac90-4686-b679-9f32f1b52f5e");

    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/

    export class DataGroup {

        /*-- PROPERTIES --*/
        private uid: string;
        private members: Array<Member>;
        private title: string;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('DataGroup Model instanced');

            //init properties
            this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();

            if(_.isEmpty(obj)) {
                this.members = [];
            } else {
                for (let key in obj.members) {
                    let memberInstance = new Member(obj.members[key]);
                    this.members = [];
                    this.addMember(memberInstance);
                }
            }

            this.title = obj.title || '';

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Uid() {
            return this.uid;
        }

        set Uid(uid: string) {
            if (uid === undefined) { throw 'Please supply DataGroup uid'; }
            this.uid = uid;
        }

        get Member() {
            return this.members;
        }

        addMember(member: Member): void {
            if(member === undefined) { throw 'Please supply data group member element (Add)'; }
            this.members.push(member);
        }

        editMember(member: Member): void {
            if(member === undefined) { throw 'Please supply data group member element (Edit)'; }
            //Edit existing Variable
            this.members.forEach(function (element, index, array) {
                if (member.Uid === element.Uid) {
                    array[index] = member;
                }
            });
        }

        get Title() {
            return this.title;
        }

        set Title(title: string) {
            if (title === undefined) { throw 'Please supply DataGroup title'; }
            this.title = title;
        }

    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/

    export class Member {

        /*-- PROPERTIES --*/
        private uid: string;
        private title: string;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('DataGroup Member Model instanced');

            //init properties
            this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
            this.title = obj.title || '';

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Uid() {
            return this.uid;
        }

        set Uid(uid: string) {
            if (uid === undefined) { throw 'Please supply DataGroup Member uid'; }
            this.uid = uid;
        }

        get Title() {
            return this.title;
        }

        set Title(title: string) {
            if (title === undefined) { throw 'Please supply DataGroup Member title'; }
            this.title = title;
        }

    }

}
