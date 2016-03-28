/**
 * AuthController
 * @description - Authorization Controller
 */

// module app.auth {
//
//     export interface IAuthController {
//         activate: () => void;
//     }
//
//     export class AuthController implements IAuthController {
//
//         static controllerId = 'finApp.auth.AuthController';
//
//         user: app.models.IUser;
//
//         static $inject = ['finApp.auth.AuthService', '$state'];
//
//         constructor(private AuthService: AuthService,
//                     private $state: ng.ui.IStateService) {
//             this.init();
//         }
//
//         //Init Properties
//         private init() {
//
//             this.user = {
//                 username: '',
//                 email: '',
//                 password: '',
//                 salary: {
//                     num: null,
//                     formatted: ''
//                 },
//                 investment: {
//                     num: null,
//                     formatted: ''
//                 },
//                 business: {
//                     num: null,
//                     formatted: ''
//                 }
//             };
//
//             this.activate();
//         }
//
//         activate(): void {
//             console.log('AuthController controller actived');
//         }
//
//         /*-- METHODS --*/
//
//
//     }
//
//     angular
//         .module('finApp.auth', [])
//         .controller(AuthController.controllerId, AuthController);
//
// }
