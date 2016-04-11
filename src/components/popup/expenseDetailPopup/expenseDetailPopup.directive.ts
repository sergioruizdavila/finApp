/**
* ExpenseDetailPopupController
* @description - Expense Detail Popup Directive
* @example - <fa-expense-detail-popup></fa-expense-detail-popup>
*/

module components.expenseDetailPopup {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IExpenseDetailPopup extends angular.IDirective {

    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    class FaExpenseDetailPopup implements IExpenseDetailPopup {

        static directiveId = 'faExpenseDetailPopup';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        bindToController: Boolean = true;
        controller = ExpenseDetailPopupController.controllerId;
        controllerAs: string = 'vm';
        restrict: string = 'E';
        templateUrl: string = 'templates/components/popup/expenseDetailPopup/expenseDetailPopup.html';
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['dataConfig'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(dataConfig: IDataConfig) {
            console.log('faExpenseDetailPopup directive constructor');
        }

        link($scope: angular.IScope, elm: Element, attr: angular.IAttributes): void {
            console.log('faExpenseDetailPopup link function');
        }

        /*-- INSTANCE FUNCTION --*/
        static instance(dataConfig: IDataConfig): IExpenseDetailPopup {
            return new FaExpenseDetailPopup(dataConfig);
        }
    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('finApp.components.faExpenseDetailPopup')
        .directive(FaExpenseDetailPopup.directiveId, FaExpenseDetailPopup.instance);


    /*********************************************************/
    /*                     CONTROLLER                        */
    /*********************************************************/
    /**
    * ExpenseDetailPopupController
    * @description - Expense Detail Popup Controller
    */

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IExpenseDetailPopupController {
        form: IExpenseDetailPopupForm;
        formatExpense: () => void;
        activate: () => void;
    }

    export interface IExpenseDetailPopupScope extends angular.IScope {
        form: IExpenseDetailPopupForm;
    }

    export interface IExpenseDetailPopupForm {
        expense: app.models.finance.IExpense;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class ExpenseDetailPopupController implements IExpenseDetailPopupController {

        static controllerId = 'finApp.components.ExpenseDetailPopupController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IExpenseDetailPopupForm;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$scope', 'finApp.core.util.FunctionsUtilService'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(public $scope: IExpenseDetailPopupScope,
                    private FunctionsUtilService: app.core.util.functionsUtil.FunctionsUtilService) {
            this.init();
        }

        /*-- INITIALIZE METHOD --*/
        private init() {
            //Init form
            this.$scope.form = {
                expense: {
                    value: {
                        num: null,
                        formatted: ''
                    },
                    title: ''
                }
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            console.log('expenseDetailPopup controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /*
        * Format Expense Method
        * @description Format the expense value with default currency
        */
        formatExpense(): void {
            let currencyObj: app.models.finance.IMoney =
            this.FunctionsUtilService.formatCurrency(this.form.expense.value.num,
                                                     this.form.expense.value.formatted);

            this.form.expense.value.num = currencyObj.num;
            this.form.expense.value.formatted = currencyObj.formatted;
        }

    }

    /*-- MODULE DEFINITION --*/
    angular.module('finApp.components.faExpenseDetailPopup')
        .controller(ExpenseDetailPopupController.controllerId, ExpenseDetailPopupController);

}
